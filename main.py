# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""The main page of Project VOICE app.
"""

import json
import os

import flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_seasurf import SeaSurf

import macro

# Load environment variables from .env file
load_dotenv(override=True)

# Base path configuration for subpath deployment
BASE_PATH = os.environ.get('BASE_PATH', '/voice').rstrip('/')
if not BASE_PATH.startswith('/'):
    BASE_PATH = '/' + BASE_PATH

app = flask.Flask(__name__, static_url_path=f'{BASE_PATH}/static')
app.config['SESSION_COOKIE_PATH'] = BASE_PATH
app.config['CSRF_COOKIE_PATH'] = BASE_PATH

CORS(app)
csrf = SeaSurf(app)
app.secret_key = os.environ.get('SECRET_KEY') or 'localkey'

# Define blueprint for the subpath
voice_bp = flask.Blueprint('voice', __name__, url_prefix=BASE_PATH)

@voice_bp.route('/', strict_slashes=False)
def Root():
  return flask.make_response(flask.render_template('index.jinja'))

@voice_bp.route('/run-macro', methods=['POST'], strict_slashes=False)
def RunMacro():
  try:
    request = flask.request
    macro_id = request.form.get('id')
    user_inputs = json.loads(request.form.get('userInputs'))
    temperature = float(request.form.get('temperature'))
    model_id = request.form.get('model_id')

    return macro.RunMacro(macro_id, user_inputs, temperature, model_id)
  except Exception as e:
    return flask.jsonify({"error": str(e)}), 500

# Register the blueprint
app.register_blueprint(voice_bp)

# Error handler to ensure JSON response for API subpath
@app.errorhandler(403)
def forbidden(e):
    return flask.jsonify(error="Forbidden (CSRF?)", details=str(e)), 403

@app.errorhandler(404)
def page_not_found(e):
    if flask.request.path.startswith(f'{BASE_PATH}/'):
        return flask.jsonify(error="Not Found", path=flask.request.path), 404
    return e

if __name__ == '__main__':
  app.run(debug=True, host=os.environ.get('FLASK_HOST', '127.0.0.1'))
