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

app = flask.Flask(__name__)

CORS(app)
csrf = SeaSurf(app)
app.secret_key = os.environ.get('SECRET_KEY') or 'localkey'

@app.route('/')
def Root():
  return flask.make_response(flask.render_template('index.jinja'))

@app.route('/run-macro', methods=['POST'], strict_slashes=False)
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

# Error handler to ensure JSON response for API
@app.errorhandler(403)
def forbidden(e):
    return flask.jsonify(error="Forbidden (CSRF?)", details=str(e)), 403

@app.errorhandler(404)
def page_not_found(e):
    return flask.jsonify(error="Not Found", path=flask.request.path), 404

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(debug=True, host=os.environ.get('FLASK_HOST', '127.0.0.1'), port=port)
