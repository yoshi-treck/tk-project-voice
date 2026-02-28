"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i9 = decorators.length - 1, decorator; i9 >= 0; i9--)
      if (decorator = decorators[i9])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/diff-match-patch/index.js
  var require_diff_match_patch = __commonJS({
    "node_modules/diff-match-patch/index.js"(exports, module) {
      var diff_match_patch2 = function() {
        this.Diff_Timeout = 1;
        this.Diff_EditCost = 4;
        this.Match_Threshold = 0.5;
        this.Match_Distance = 1e3;
        this.Patch_DeleteThreshold = 0.5;
        this.Patch_Margin = 4;
        this.Match_MaxBits = 32;
      };
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;
      diff_match_patch2.Diff = function(op, text) {
        return [op, text];
      };
      diff_match_patch2.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
        if (typeof opt_deadline == "undefined") {
          if (this.Diff_Timeout <= 0) {
            opt_deadline = Number.MAX_VALUE;
          } else {
            opt_deadline = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3;
          }
        }
        var deadline = opt_deadline;
        if (text1 == null || text2 == null) {
          throw new Error("Null input. (diff_main)");
        }
        if (text1 == text2) {
          if (text1) {
            return [new diff_match_patch2.Diff(DIFF_EQUAL, text1)];
          }
          return [];
        }
        if (typeof opt_checklines == "undefined") {
          opt_checklines = true;
        }
        var checklines = opt_checklines;
        var commonlength = this.diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);
        commonlength = this.diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);
        var diffs = this.diff_compute_(text1, text2, checklines, deadline);
        if (commonprefix) {
          diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL, commonprefix));
        }
        if (commonsuffix) {
          diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, commonsuffix));
        }
        this.diff_cleanupMerge(diffs);
        return diffs;
      };
      diff_match_patch2.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
        var diffs;
        if (!text1) {
          return [new diff_match_patch2.Diff(DIFF_INSERT, text2)];
        }
        if (!text2) {
          return [new diff_match_patch2.Diff(DIFF_DELETE, text1)];
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i9 = longtext.indexOf(shorttext);
        if (i9 != -1) {
          diffs = [
            new diff_match_patch2.Diff(DIFF_INSERT, longtext.substring(0, i9)),
            new diff_match_patch2.Diff(DIFF_EQUAL, shorttext),
            new diff_match_patch2.Diff(
              DIFF_INSERT,
              longtext.substring(i9 + shorttext.length)
            )
          ];
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }
        if (shorttext.length == 1) {
          return [
            new diff_match_patch2.Diff(DIFF_DELETE, text1),
            new diff_match_patch2.Diff(DIFF_INSERT, text2)
          ];
        }
        var hm = this.diff_halfMatch_(text1, text2);
        if (hm) {
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
          var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
          return diffs_a.concat(
            [new diff_match_patch2.Diff(DIFF_EQUAL, mid_common)],
            diffs_b
          );
        }
        if (checklines && text1.length > 100 && text2.length > 100) {
          return this.diff_lineMode_(text1, text2, deadline);
        }
        return this.diff_bisect_(text1, text2, deadline);
      };
      diff_match_patch2.prototype.diff_lineMode_ = function(text1, text2, deadline) {
        var a4 = this.diff_linesToChars_(text1, text2);
        text1 = a4.chars1;
        text2 = a4.chars2;
        var linearray = a4.lineArray;
        var diffs = this.diff_main(text1, text2, false, deadline);
        this.diff_charsToLines_(diffs, linearray);
        this.diff_cleanupSemantic(diffs);
        diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              break;
            case DIFF_EQUAL:
              if (count_delete >= 1 && count_insert >= 1) {
                diffs.splice(
                  pointer - count_delete - count_insert,
                  count_delete + count_insert
                );
                pointer = pointer - count_delete - count_insert;
                var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
                for (var j2 = subDiff.length - 1; j2 >= 0; j2--) {
                  diffs.splice(pointer, 0, subDiff[j2]);
                }
                pointer = pointer + subDiff.length;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
          pointer++;
        }
        diffs.pop();
        return diffs;
      };
      diff_match_patch2.prototype.diff_bisect_ = function(text1, text2, deadline) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        for (var x2 = 0; x2 < v_length; x2++) {
          v1[x2] = -1;
          v2[x2] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        var front = delta % 2 != 0;
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d3 = 0; d3 < max_d; d3++) {
          if ((/* @__PURE__ */ new Date()).getTime() > deadline) {
            break;
          }
          for (var k1 = -d3 + k1start; k1 <= d3 - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 == -d3 || k1 != d3 && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              k1end += 2;
            } else if (y1 > text2_length) {
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                var x22 = text1_length - v2[k2_offset];
                if (x1 >= x22) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
          for (var k2 = -d3 + k2start; k2 <= d3 - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x22;
            if (k2 == -d3 || k2 != d3 && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x22 = v2[k2_offset + 1];
            } else {
              x22 = v2[k2_offset - 1] + 1;
            }
            var y22 = x22 - k2;
            while (x22 < text1_length && y22 < text2_length && text1.charAt(text1_length - x22 - 1) == text2.charAt(text2_length - y22 - 1)) {
              x22++;
              y22++;
            }
            v2[k2_offset] = x22;
            if (x22 > text1_length) {
              k2end += 2;
            } else if (y22 > text2_length) {
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                x22 = text1_length - x22;
                if (x1 >= x22) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
        }
        return [
          new diff_match_patch2.Diff(DIFF_DELETE, text1),
          new diff_match_patch2.Diff(DIFF_INSERT, text2)
        ];
      };
      diff_match_patch2.prototype.diff_bisectSplit_ = function(text1, text2, x2, y3, deadline) {
        var text1a = text1.substring(0, x2);
        var text2a = text2.substring(0, y3);
        var text1b = text1.substring(x2);
        var text2b = text2.substring(y3);
        var diffs = this.diff_main(text1a, text2a, false, deadline);
        var diffsb = this.diff_main(text1b, text2b, false, deadline);
        return diffs.concat(diffsb);
      };
      diff_match_patch2.prototype.diff_linesToChars_ = function(text1, text2) {
        var lineArray = [];
        var lineHash = {};
        lineArray[0] = "";
        function diff_linesToCharsMunge_(text) {
          var chars = "";
          var lineStart = 0;
          var lineEnd = -1;
          var lineArrayLength = lineArray.length;
          while (lineEnd < text.length - 1) {
            lineEnd = text.indexOf("\n", lineStart);
            if (lineEnd == -1) {
              lineEnd = text.length - 1;
            }
            var line = text.substring(lineStart, lineEnd + 1);
            if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
              chars += String.fromCharCode(lineHash[line]);
            } else {
              if (lineArrayLength == maxLines) {
                line = text.substring(lineStart);
                lineEnd = text.length;
              }
              chars += String.fromCharCode(lineArrayLength);
              lineHash[line] = lineArrayLength;
              lineArray[lineArrayLength++] = line;
            }
            lineStart = lineEnd + 1;
          }
          return chars;
        }
        var maxLines = 4e4;
        var chars1 = diff_linesToCharsMunge_(text1);
        maxLines = 65535;
        var chars2 = diff_linesToCharsMunge_(text2);
        return { chars1, chars2, lineArray };
      };
      diff_match_patch2.prototype.diff_charsToLines_ = function(diffs, lineArray) {
        for (var i9 = 0; i9 < diffs.length; i9++) {
          var chars = diffs[i9][1];
          var text = [];
          for (var j2 = 0; j2 < chars.length; j2++) {
            text[j2] = lineArray[chars.charCodeAt(j2)];
          }
          diffs[i9][1] = text.join("");
        }
      };
      diff_match_patch2.prototype.diff_commonPrefix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch2.prototype.diff_commonSuffix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch2.prototype.diff_commonOverlap_ = function(text1, text2) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        if (text1_length == 0 || text2_length == 0) {
          return 0;
        }
        if (text1_length > text2_length) {
          text1 = text1.substring(text1_length - text2_length);
        } else if (text1_length < text2_length) {
          text2 = text2.substring(0, text1_length);
        }
        var text_length = Math.min(text1_length, text2_length);
        if (text1 == text2) {
          return text_length;
        }
        var best = 0;
        var length = 1;
        while (true) {
          var pattern = text1.substring(text_length - length);
          var found = text2.indexOf(pattern);
          if (found == -1) {
            return best;
          }
          length += found;
          if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
            best = length;
            length++;
          }
        }
      };
      diff_match_patch2.prototype.diff_halfMatch_ = function(text1, text2) {
        if (this.Diff_Timeout <= 0) {
          return null;
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null;
        }
        var dmp = this;
        function diff_halfMatchI_(longtext2, shorttext2, i9) {
          var seed = longtext2.substring(i9, i9 + Math.floor(longtext2.length / 4));
          var j2 = -1;
          var best_common = "";
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j2 = shorttext2.indexOf(seed, j2 + 1)) != -1) {
            var prefixLength = dmp.diff_commonPrefix(
              longtext2.substring(i9),
              shorttext2.substring(j2)
            );
            var suffixLength = dmp.diff_commonSuffix(
              longtext2.substring(0, i9),
              shorttext2.substring(0, j2)
            );
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext2.substring(j2 - suffixLength, j2) + shorttext2.substring(j2, j2 + prefixLength);
              best_longtext_a = longtext2.substring(0, i9 - suffixLength);
              best_longtext_b = longtext2.substring(i9 + prefixLength);
              best_shorttext_a = shorttext2.substring(0, j2 - suffixLength);
              best_shorttext_b = shorttext2.substring(j2 + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext2.length) {
            return [
              best_longtext_a,
              best_longtext_b,
              best_shorttext_a,
              best_shorttext_b,
              best_common
            ];
          } else {
            return null;
          }
        }
        var hm1 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 4)
        );
        var hm2 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 2)
        );
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      };
      diff_match_patch2.prototype.diff_cleanupSemantic = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var length_insertions1 = 0;
        var length_deletions1 = 0;
        var length_insertions2 = 0;
        var length_deletions2 = 0;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = diffs[pointer][1];
          } else {
            if (diffs[pointer][0] == DIFF_INSERT) {
              length_insertions2 += diffs[pointer][1].length;
            } else {
              length_deletions2 += diffs[pointer][1].length;
            }
            if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(
              length_insertions2,
              length_deletions2
            )) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch2.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              length_insertions1 = 0;
              length_deletions1 = 0;
              length_insertions2 = 0;
              length_deletions2 = 0;
              lastEquality = null;
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
        this.diff_cleanupSemanticLossless(diffs);
        pointer = 1;
        while (pointer < diffs.length) {
          if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
            var deletion = diffs[pointer - 1][1];
            var insertion = diffs[pointer][1];
            var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
            var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
              if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch2.Diff(
                  DIFF_EQUAL,
                  insertion.substring(0, overlap_length1)
                ));
                diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                pointer++;
              }
            } else {
              if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch2.Diff(
                  DIFF_EQUAL,
                  deletion.substring(0, overlap_length2)
                ));
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
              }
            }
            pointer++;
          }
          pointer++;
        }
      };
      diff_match_patch2.prototype.diff_cleanupSemanticLossless = function(diffs) {
        function diff_cleanupSemanticScore_(one, two) {
          if (!one || !two) {
            return 6;
          }
          var char1 = one.charAt(one.length - 1);
          var char2 = two.charAt(0);
          var nonAlphaNumeric1 = char1.match(diff_match_patch2.nonAlphaNumericRegex_);
          var nonAlphaNumeric2 = char2.match(diff_match_patch2.nonAlphaNumericRegex_);
          var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch2.whitespaceRegex_);
          var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch2.whitespaceRegex_);
          var lineBreak1 = whitespace1 && char1.match(diff_match_patch2.linebreakRegex_);
          var lineBreak2 = whitespace2 && char2.match(diff_match_patch2.linebreakRegex_);
          var blankLine1 = lineBreak1 && one.match(diff_match_patch2.blanklineEndRegex_);
          var blankLine2 = lineBreak2 && two.match(diff_match_patch2.blanklineStartRegex_);
          if (blankLine1 || blankLine2) {
            return 5;
          } else if (lineBreak1 || lineBreak2) {
            return 4;
          } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
            return 3;
          } else if (whitespace1 || whitespace2) {
            return 2;
          } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
            return 1;
          }
          return 0;
        }
        var pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            var equality1 = diffs[pointer - 1][1];
            var edit = diffs[pointer][1];
            var equality2 = diffs[pointer + 1][1];
            var commonOffset = this.diff_commonSuffix(equality1, edit);
            if (commonOffset) {
              var commonString = edit.substring(edit.length - commonOffset);
              equality1 = equality1.substring(0, equality1.length - commonOffset);
              edit = commonString + edit.substring(0, edit.length - commonOffset);
              equality2 = commonString + equality2;
            }
            var bestEquality1 = equality1;
            var bestEdit = edit;
            var bestEquality2 = equality2;
            var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while (edit.charAt(0) === equality2.charAt(0)) {
              equality1 += edit.charAt(0);
              edit = edit.substring(1) + equality2.charAt(0);
              equality2 = equality2.substring(1);
              var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
              if (score >= bestScore) {
                bestScore = score;
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
              }
            }
            if (diffs[pointer - 1][1] != bestEquality1) {
              if (bestEquality1) {
                diffs[pointer - 1][1] = bestEquality1;
              } else {
                diffs.splice(pointer - 1, 1);
                pointer--;
              }
              diffs[pointer][1] = bestEdit;
              if (bestEquality2) {
                diffs[pointer + 1][1] = bestEquality2;
              } else {
                diffs.splice(pointer + 1, 1);
                pointer--;
              }
            }
          }
          pointer++;
        }
      };
      diff_match_patch2.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
      diff_match_patch2.whitespaceRegex_ = /\s/;
      diff_match_patch2.linebreakRegex_ = /[\r\n]/;
      diff_match_patch2.blanklineEndRegex_ = /\n\r?\n$/;
      diff_match_patch2.blanklineStartRegex_ = /^\r?\n\r?\n/;
      diff_match_patch2.prototype.diff_cleanupEfficiency = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var pre_ins = false;
        var pre_del = false;
        var post_ins = false;
        var post_del = false;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
              equalities[equalitiesLength++] = pointer;
              pre_ins = post_ins;
              pre_del = post_del;
              lastEquality = diffs[pointer][1];
            } else {
              equalitiesLength = 0;
              lastEquality = null;
            }
            post_ins = post_del = false;
          } else {
            if (diffs[pointer][0] == DIFF_DELETE) {
              post_del = true;
            } else {
              post_ins = true;
            }
            if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch2.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              lastEquality = null;
              if (pre_ins && pre_del) {
                post_ins = post_del = true;
                equalitiesLength = 0;
              } else {
                equalitiesLength--;
                pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                post_ins = post_del = false;
              }
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch2.prototype.diff_cleanupMerge = function(diffs) {
        diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        var commonlength;
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              if (count_delete + count_insert > 1) {
                if (count_delete !== 0 && count_insert !== 0) {
                  commonlength = this.diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                    } else {
                      diffs.splice(0, 0, new diff_match_patch2.Diff(
                        DIFF_EQUAL,
                        text_insert.substring(0, commonlength)
                      ));
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  commonlength = this.diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(0, text_insert.length - commonlength);
                    text_delete = text_delete.substring(0, text_delete.length - commonlength);
                  }
                }
                pointer -= count_delete + count_insert;
                diffs.splice(pointer, count_delete + count_insert);
                if (text_delete.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch2.Diff(DIFF_DELETE, text_delete)
                  );
                  pointer++;
                }
                if (text_insert.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch2.Diff(DIFF_INSERT, text_insert)
                  );
                  pointer++;
                }
                pointer++;
              } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === "") {
          diffs.pop();
        }
        var changes = false;
        pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch2.prototype.diff_xIndex = function(diffs, loc) {
        var chars1 = 0;
        var chars2 = 0;
        var last_chars1 = 0;
        var last_chars2 = 0;
        var x2;
        for (x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_INSERT) {
            chars1 += diffs[x2][1].length;
          }
          if (diffs[x2][0] !== DIFF_DELETE) {
            chars2 += diffs[x2][1].length;
          }
          if (chars1 > loc) {
            break;
          }
          last_chars1 = chars1;
          last_chars2 = chars2;
        }
        if (diffs.length != x2 && diffs[x2][0] === DIFF_DELETE) {
          return last_chars2;
        }
        return last_chars2 + (loc - last_chars1);
      };
      diff_match_patch2.prototype.diff_prettyHtml = function(diffs) {
        var html = [];
        var pattern_amp = /&/g;
        var pattern_lt = /</g;
        var pattern_gt = />/g;
        var pattern_para = /\n/g;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var op = diffs[x2][0];
          var data = diffs[x2][1];
          var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
          switch (op) {
            case DIFF_INSERT:
              html[x2] = '<ins style="background:#e6ffe6;">' + text + "</ins>";
              break;
            case DIFF_DELETE:
              html[x2] = '<del style="background:#ffe6e6;">' + text + "</del>";
              break;
            case DIFF_EQUAL:
              html[x2] = "<span>" + text + "</span>";
              break;
          }
        }
        return html.join("");
      };
      diff_match_patch2.prototype.diff_text1 = function(diffs) {
        var text = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_INSERT) {
            text[x2] = diffs[x2][1];
          }
        }
        return text.join("");
      };
      diff_match_patch2.prototype.diff_text2 = function(diffs) {
        var text = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_DELETE) {
            text[x2] = diffs[x2][1];
          }
        }
        return text.join("");
      };
      diff_match_patch2.prototype.diff_levenshtein = function(diffs) {
        var levenshtein = 0;
        var insertions = 0;
        var deletions = 0;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var op = diffs[x2][0];
          var data = diffs[x2][1];
          switch (op) {
            case DIFF_INSERT:
              insertions += data.length;
              break;
            case DIFF_DELETE:
              deletions += data.length;
              break;
            case DIFF_EQUAL:
              levenshtein += Math.max(insertions, deletions);
              insertions = 0;
              deletions = 0;
              break;
          }
        }
        levenshtein += Math.max(insertions, deletions);
        return levenshtein;
      };
      diff_match_patch2.prototype.diff_toDelta = function(diffs) {
        var text = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          switch (diffs[x2][0]) {
            case DIFF_INSERT:
              text[x2] = "+" + encodeURI(diffs[x2][1]);
              break;
            case DIFF_DELETE:
              text[x2] = "-" + diffs[x2][1].length;
              break;
            case DIFF_EQUAL:
              text[x2] = "=" + diffs[x2][1].length;
              break;
          }
        }
        return text.join("	").replace(/%20/g, " ");
      };
      diff_match_patch2.prototype.diff_fromDelta = function(text1, delta) {
        var diffs = [];
        var diffsLength = 0;
        var pointer = 0;
        var tokens = delta.split(/\t/g);
        for (var x2 = 0; x2 < tokens.length; x2++) {
          var param = tokens[x2].substring(1);
          switch (tokens[x2].charAt(0)) {
            case "+":
              try {
                diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_INSERT, decodeURI(param));
              } catch (ex) {
                throw new Error("Illegal escape in diff_fromDelta: " + param);
              }
              break;
            case "-":
            // Fall through.
            case "=":
              var n10 = parseInt(param, 10);
              if (isNaN(n10) || n10 < 0) {
                throw new Error("Invalid number in diff_fromDelta: " + param);
              }
              var text = text1.substring(pointer, pointer += n10);
              if (tokens[x2].charAt(0) == "=") {
                diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_EQUAL, text);
              } else {
                diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_DELETE, text);
              }
              break;
            default:
              if (tokens[x2]) {
                throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x2]);
              }
          }
        }
        if (pointer != text1.length) {
          throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
        }
        return diffs;
      };
      diff_match_patch2.prototype.match_main = function(text, pattern, loc) {
        if (text == null || pattern == null || loc == null) {
          throw new Error("Null input. (match_main)");
        }
        loc = Math.max(0, Math.min(loc, text.length));
        if (text == pattern) {
          return 0;
        } else if (!text.length) {
          return -1;
        } else if (text.substring(loc, loc + pattern.length) == pattern) {
          return loc;
        } else {
          return this.match_bitap_(text, pattern, loc);
        }
      };
      diff_match_patch2.prototype.match_bitap_ = function(text, pattern, loc) {
        if (pattern.length > this.Match_MaxBits) {
          throw new Error("Pattern too long for this browser.");
        }
        var s6 = this.match_alphabet_(pattern);
        var dmp = this;
        function match_bitapScore_(e10, x2) {
          var accuracy = e10 / pattern.length;
          var proximity = Math.abs(loc - x2);
          if (!dmp.Match_Distance) {
            return proximity ? 1 : accuracy;
          }
          return accuracy + proximity / dmp.Match_Distance;
        }
        var score_threshold = this.Match_Threshold;
        var best_loc = text.indexOf(pattern, loc);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          best_loc = text.lastIndexOf(pattern, loc + pattern.length);
          if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          }
        }
        var matchmask = 1 << pattern.length - 1;
        best_loc = -1;
        var bin_min, bin_mid;
        var bin_max = pattern.length + text.length;
        var last_rd;
        for (var d3 = 0; d3 < pattern.length; d3++) {
          bin_min = 0;
          bin_mid = bin_max;
          while (bin_min < bin_mid) {
            if (match_bitapScore_(d3, loc + bin_mid) <= score_threshold) {
              bin_min = bin_mid;
            } else {
              bin_max = bin_mid;
            }
            bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
          }
          bin_max = bin_mid;
          var start = Math.max(1, loc - bin_mid + 1);
          var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
          var rd = Array(finish + 2);
          rd[finish + 1] = (1 << d3) - 1;
          for (var j2 = finish; j2 >= start; j2--) {
            var charMatch = s6[text.charAt(j2 - 1)];
            if (d3 === 0) {
              rd[j2] = (rd[j2 + 1] << 1 | 1) & charMatch;
            } else {
              rd[j2] = (rd[j2 + 1] << 1 | 1) & charMatch | ((last_rd[j2 + 1] | last_rd[j2]) << 1 | 1) | last_rd[j2 + 1];
            }
            if (rd[j2] & matchmask) {
              var score = match_bitapScore_(d3, j2 - 1);
              if (score <= score_threshold) {
                score_threshold = score;
                best_loc = j2 - 1;
                if (best_loc > loc) {
                  start = Math.max(1, 2 * loc - best_loc);
                } else {
                  break;
                }
              }
            }
          }
          if (match_bitapScore_(d3 + 1, loc) > score_threshold) {
            break;
          }
          last_rd = rd;
        }
        return best_loc;
      };
      diff_match_patch2.prototype.match_alphabet_ = function(pattern) {
        var s6 = {};
        for (var i9 = 0; i9 < pattern.length; i9++) {
          s6[pattern.charAt(i9)] = 0;
        }
        for (var i9 = 0; i9 < pattern.length; i9++) {
          s6[pattern.charAt(i9)] |= 1 << pattern.length - i9 - 1;
        }
        return s6;
      };
      diff_match_patch2.prototype.patch_addContext_ = function(patch, text) {
        if (text.length == 0) {
          return;
        }
        if (patch.start2 === null) {
          throw Error("patch not initialized");
        }
        var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
        var padding = 0;
        while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
          padding += this.Patch_Margin;
          pattern = text.substring(
            patch.start2 - padding,
            patch.start2 + patch.length1 + padding
          );
        }
        padding += this.Patch_Margin;
        var prefix = text.substring(patch.start2 - padding, patch.start2);
        if (prefix) {
          patch.diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL, prefix));
        }
        var suffix = text.substring(
          patch.start2 + patch.length1,
          patch.start2 + patch.length1 + padding
        );
        if (suffix) {
          patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, suffix));
        }
        patch.start1 -= prefix.length;
        patch.start2 -= prefix.length;
        patch.length1 += prefix.length + suffix.length;
        patch.length2 += prefix.length + suffix.length;
      };
      diff_match_patch2.prototype.patch_make = function(a4, opt_b, opt_c) {
        var text1, diffs;
        if (typeof a4 == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a4;
          diffs = this.diff_main(
            text1,
            /** @type {string} */
            opt_b,
            true
          );
          if (diffs.length > 2) {
            this.diff_cleanupSemantic(diffs);
            this.diff_cleanupEfficiency(diffs);
          }
        } else if (a4 && typeof a4 == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          a4;
          text1 = this.diff_text1(diffs);
        } else if (typeof a4 == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a4;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_b;
        } else if (typeof a4 == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
          text1 = /** @type {string} */
          a4;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_c;
        } else {
          throw new Error("Unknown call format to patch_make.");
        }
        if (diffs.length === 0) {
          return [];
        }
        var patches = [];
        var patch = new diff_match_patch2.patch_obj();
        var patchDiffLength = 0;
        var char_count1 = 0;
        var char_count2 = 0;
        var prepatch_text = text1;
        var postpatch_text = text1;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var diff_type = diffs[x2][0];
          var diff_text = diffs[x2][1];
          if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
            patch.start1 = char_count1;
            patch.start2 = char_count2;
          }
          switch (diff_type) {
            case DIFF_INSERT:
              patch.diffs[patchDiffLength++] = diffs[x2];
              patch.length2 += diff_text.length;
              postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
              break;
            case DIFF_DELETE:
              patch.length1 += diff_text.length;
              patch.diffs[patchDiffLength++] = diffs[x2];
              postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
              break;
            case DIFF_EQUAL:
              if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x2 + 1) {
                patch.diffs[patchDiffLength++] = diffs[x2];
                patch.length1 += diff_text.length;
                patch.length2 += diff_text.length;
              } else if (diff_text.length >= 2 * this.Patch_Margin) {
                if (patchDiffLength) {
                  this.patch_addContext_(patch, prepatch_text);
                  patches.push(patch);
                  patch = new diff_match_patch2.patch_obj();
                  patchDiffLength = 0;
                  prepatch_text = postpatch_text;
                  char_count1 = char_count2;
                }
              }
              break;
          }
          if (diff_type !== DIFF_INSERT) {
            char_count1 += diff_text.length;
          }
          if (diff_type !== DIFF_DELETE) {
            char_count2 += diff_text.length;
          }
        }
        if (patchDiffLength) {
          this.patch_addContext_(patch, prepatch_text);
          patches.push(patch);
        }
        return patches;
      };
      diff_match_patch2.prototype.patch_deepCopy = function(patches) {
        var patchesCopy = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          var patch = patches[x2];
          var patchCopy = new diff_match_patch2.patch_obj();
          patchCopy.diffs = [];
          for (var y3 = 0; y3 < patch.diffs.length; y3++) {
            patchCopy.diffs[y3] = new diff_match_patch2.Diff(patch.diffs[y3][0], patch.diffs[y3][1]);
          }
          patchCopy.start1 = patch.start1;
          patchCopy.start2 = patch.start2;
          patchCopy.length1 = patch.length1;
          patchCopy.length2 = patch.length2;
          patchesCopy[x2] = patchCopy;
        }
        return patchesCopy;
      };
      diff_match_patch2.prototype.patch_apply = function(patches, text) {
        if (patches.length == 0) {
          return [text, []];
        }
        patches = this.patch_deepCopy(patches);
        var nullPadding = this.patch_addPadding(patches);
        text = nullPadding + text + nullPadding;
        this.patch_splitMax(patches);
        var delta = 0;
        var results = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          var expected_loc = patches[x2].start2 + delta;
          var text1 = this.diff_text1(patches[x2].diffs);
          var start_loc;
          var end_loc = -1;
          if (text1.length > this.Match_MaxBits) {
            start_loc = this.match_main(
              text,
              text1.substring(0, this.Match_MaxBits),
              expected_loc
            );
            if (start_loc != -1) {
              end_loc = this.match_main(
                text,
                text1.substring(text1.length - this.Match_MaxBits),
                expected_loc + text1.length - this.Match_MaxBits
              );
              if (end_loc == -1 || start_loc >= end_loc) {
                start_loc = -1;
              }
            }
          } else {
            start_loc = this.match_main(text, text1, expected_loc);
          }
          if (start_loc == -1) {
            results[x2] = false;
            delta -= patches[x2].length2 - patches[x2].length1;
          } else {
            results[x2] = true;
            delta = start_loc - expected_loc;
            var text2;
            if (end_loc == -1) {
              text2 = text.substring(start_loc, start_loc + text1.length);
            } else {
              text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
            }
            if (text1 == text2) {
              text = text.substring(0, start_loc) + this.diff_text2(patches[x2].diffs) + text.substring(start_loc + text1.length);
            } else {
              var diffs = this.diff_main(text1, text2, false);
              if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
                results[x2] = false;
              } else {
                this.diff_cleanupSemanticLossless(diffs);
                var index1 = 0;
                var index2;
                for (var y3 = 0; y3 < patches[x2].diffs.length; y3++) {
                  var mod = patches[x2].diffs[y3];
                  if (mod[0] !== DIFF_EQUAL) {
                    index2 = this.diff_xIndex(diffs, index1);
                  }
                  if (mod[0] === DIFF_INSERT) {
                    text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                  } else if (mod[0] === DIFF_DELETE) {
                    text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(
                      diffs,
                      index1 + mod[1].length
                    ));
                  }
                  if (mod[0] !== DIFF_DELETE) {
                    index1 += mod[1].length;
                  }
                }
              }
            }
          }
        }
        text = text.substring(nullPadding.length, text.length - nullPadding.length);
        return [text, results];
      };
      diff_match_patch2.prototype.patch_addPadding = function(patches) {
        var paddingLength = this.Patch_Margin;
        var nullPadding = "";
        for (var x2 = 1; x2 <= paddingLength; x2++) {
          nullPadding += String.fromCharCode(x2);
        }
        for (var x2 = 0; x2 < patches.length; x2++) {
          patches[x2].start1 += paddingLength;
          patches[x2].start2 += paddingLength;
        }
        var patch = patches[0];
        var diffs = patch.diffs;
        if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
          diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL, nullPadding));
          patch.start1 -= paddingLength;
          patch.start2 -= paddingLength;
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[0][1].length) {
          var extraLength = paddingLength - diffs[0][1].length;
          diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
          patch.start1 -= extraLength;
          patch.start2 -= extraLength;
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        patch = patches[patches.length - 1];
        diffs = patch.diffs;
        if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
          diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, nullPadding));
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[diffs.length - 1][1].length) {
          var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
          diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        return nullPadding;
      };
      diff_match_patch2.prototype.patch_splitMax = function(patches) {
        var patch_size = this.Match_MaxBits;
        for (var x2 = 0; x2 < patches.length; x2++) {
          if (patches[x2].length1 <= patch_size) {
            continue;
          }
          var bigpatch = patches[x2];
          patches.splice(x2--, 1);
          var start1 = bigpatch.start1;
          var start2 = bigpatch.start2;
          var precontext = "";
          while (bigpatch.diffs.length !== 0) {
            var patch = new diff_match_patch2.patch_obj();
            var empty = true;
            patch.start1 = start1 - precontext.length;
            patch.start2 = start2 - precontext.length;
            if (precontext !== "") {
              patch.length1 = patch.length2 = precontext.length;
              patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, precontext));
            }
            while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
              var diff_type = bigpatch.diffs[0][0];
              var diff_text = bigpatch.diffs[0][1];
              if (diff_type === DIFF_INSERT) {
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
                patch.diffs.push(bigpatch.diffs.shift());
                empty = false;
              } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                empty = false;
                patch.diffs.push(new diff_match_patch2.Diff(diff_type, diff_text));
                bigpatch.diffs.shift();
              } else {
                diff_text = diff_text.substring(
                  0,
                  patch_size - patch.length1 - this.Patch_Margin
                );
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                if (diff_type === DIFF_EQUAL) {
                  patch.length2 += diff_text.length;
                  start2 += diff_text.length;
                } else {
                  empty = false;
                }
                patch.diffs.push(new diff_match_patch2.Diff(diff_type, diff_text));
                if (diff_text == bigpatch.diffs[0][1]) {
                  bigpatch.diffs.shift();
                } else {
                  bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
                }
              }
            }
            precontext = this.diff_text2(patch.diffs);
            precontext = precontext.substring(precontext.length - this.Patch_Margin);
            var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
            if (postcontext !== "") {
              patch.length1 += postcontext.length;
              patch.length2 += postcontext.length;
              if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
                patch.diffs[patch.diffs.length - 1][1] += postcontext;
              } else {
                patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, postcontext));
              }
            }
            if (!empty) {
              patches.splice(++x2, 0, patch);
            }
          }
        }
      };
      diff_match_patch2.prototype.patch_toText = function(patches) {
        var text = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          text[x2] = patches[x2];
        }
        return text.join("");
      };
      diff_match_patch2.prototype.patch_fromText = function(textline) {
        var patches = [];
        if (!textline) {
          return patches;
        }
        var text = textline.split("\n");
        var textPointer = 0;
        var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
        while (textPointer < text.length) {
          var m4 = text[textPointer].match(patchHeader);
          if (!m4) {
            throw new Error("Invalid patch string: " + text[textPointer]);
          }
          var patch = new diff_match_patch2.patch_obj();
          patches.push(patch);
          patch.start1 = parseInt(m4[1], 10);
          if (m4[2] === "") {
            patch.start1--;
            patch.length1 = 1;
          } else if (m4[2] == "0") {
            patch.length1 = 0;
          } else {
            patch.start1--;
            patch.length1 = parseInt(m4[2], 10);
          }
          patch.start2 = parseInt(m4[3], 10);
          if (m4[4] === "") {
            patch.start2--;
            patch.length2 = 1;
          } else if (m4[4] == "0") {
            patch.length2 = 0;
          } else {
            patch.start2--;
            patch.length2 = parseInt(m4[4], 10);
          }
          textPointer++;
          while (textPointer < text.length) {
            var sign = text[textPointer].charAt(0);
            try {
              var line = decodeURI(text[textPointer].substring(1));
            } catch (ex) {
              throw new Error("Illegal escape in patch_fromText: " + line);
            }
            if (sign == "-") {
              patch.diffs.push(new diff_match_patch2.Diff(DIFF_DELETE, line));
            } else if (sign == "+") {
              patch.diffs.push(new diff_match_patch2.Diff(DIFF_INSERT, line));
            } else if (sign == " ") {
              patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL, line));
            } else if (sign == "@") {
              break;
            } else if (sign === "") {
            } else {
              throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
            }
            textPointer++;
          }
        }
        return patches;
      };
      diff_match_patch2.patch_obj = function() {
        this.diffs = [];
        this.start1 = null;
        this.start2 = null;
        this.length1 = 0;
        this.length2 = 0;
      };
      diff_match_patch2.patch_obj.prototype.toString = function() {
        var coords1, coords2;
        if (this.length1 === 0) {
          coords1 = this.start1 + ",0";
        } else if (this.length1 == 1) {
          coords1 = this.start1 + 1;
        } else {
          coords1 = this.start1 + 1 + "," + this.length1;
        }
        if (this.length2 === 0) {
          coords2 = this.start2 + ",0";
        } else if (this.length2 == 1) {
          coords2 = this.start2 + 1;
        } else {
          coords2 = this.start2 + 1 + "," + this.length2;
        }
        var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
        var op;
        for (var x2 = 0; x2 < this.diffs.length; x2++) {
          switch (this.diffs[x2][0]) {
            case DIFF_INSERT:
              op = "+";
              break;
            case DIFF_DELETE:
              op = "-";
              break;
            case DIFF_EQUAL:
              op = " ";
              break;
          }
          text[x2 + 1] = op + encodeURI(this.diffs[x2][1]) + "\n";
        }
        return text.join("").replace(/%20/g, " ");
      };
      module.exports = diff_match_patch2;
      module.exports["diff_match_patch"] = diff_match_patch2;
      module.exports["DIFF_DELETE"] = DIFF_DELETE;
      module.exports["DIFF_INSERT"] = DIFF_INSERT;
      module.exports["DIFF_EQUAL"] = DIFF_EQUAL;
    }
  });

  // node_modules/tslib/tslib.es6.mjs
  function __decorate(decorators, target, key, desc) {
    var c6 = arguments.length, r11 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r11 = Reflect.decorate(decorators, target, key, desc);
    else for (var i9 = decorators.length - 1; i9 >= 0; i9--) if (d3 = decorators[i9]) r11 = (c6 < 3 ? d3(r11) : c6 > 3 ? d3(target, key, r11) : d3(target, key)) || r11;
    return c6 > 3 && r11 && Object.defineProperty(target, key, r11), r11;
  }

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t = (t6) => (e10, o13) => {
    void 0 !== o13 ? o13.addInitializer(() => {
      customElements.define(t6, e10);
    }) : customElements.define(t6, e10);
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t6, e10, o13) {
      if (this._$cssResult$ = true, o13 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t6, this.t = e10;
    }
    get styleSheet() {
      let t6 = this.o;
      const s6 = this.t;
      if (e && void 0 === t6) {
        const e10 = void 0 !== s6 && 1 === s6.length;
        e10 && (t6 = o.get(s6)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o.set(s6, t6));
      }
      return t6;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
  var i = (t6, ...e10) => {
    const o13 = 1 === t6.length ? t6[0] : e10.reduce((e11, s6, o14) => e11 + ((t7) => {
      if (true === t7._$cssResult$) return t7.cssText;
      if ("number" == typeof t7) return t7;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t6[o14 + 1], t6[0]);
    return new n(o13, t6, s);
  };
  var S = (s6, o13) => {
    if (e) s6.adoptedStyleSheets = o13.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
    else for (const e10 of o13) {
      const o14 = document.createElement("style"), n10 = t2.litNonce;
      void 0 !== n10 && o14.setAttribute("nonce", n10), o14.textContent = e10.cssText, s6.appendChild(o14);
    }
  };
  var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
    let e10 = "";
    for (const s6 of t7.cssRules) e10 += s6.cssText;
    return r(e10);
  })(t6) : t6;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t6, s6) => t6;
  var u = { toAttribute(t6, s6) {
    switch (s6) {
      case Boolean:
        t6 = t6 ? l : null;
        break;
      case Object:
      case Array:
        t6 = null == t6 ? t6 : JSON.stringify(t6);
    }
    return t6;
  }, fromAttribute(t6, s6) {
    let i9 = t6;
    switch (s6) {
      case Boolean:
        i9 = null !== t6;
        break;
      case Number:
        i9 = null === t6 ? null : Number(t6);
        break;
      case Object:
      case Array:
        try {
          i9 = JSON.parse(t6);
        } catch (t7) {
          i9 = null;
        }
    }
    return i9;
  } };
  var f = (t6, s6) => !i2(t6, s6);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t6) {
      this._$Ei(), (this.l ??= []).push(t6);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t6, s6 = b) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s6 = Object.create(s6)).wrapped = true), this.elementProperties.set(t6, s6), !s6.noAccessor) {
        const i9 = Symbol(), h6 = this.getPropertyDescriptor(t6, i9, s6);
        void 0 !== h6 && e2(this.prototype, t6, h6);
      }
    }
    static getPropertyDescriptor(t6, s6, i9) {
      const { get: e10, set: r11 } = h(this.prototype, t6) ?? { get() {
        return this[s6];
      }, set(t7) {
        this[s6] = t7;
      } };
      return { get: e10, set(s7) {
        const h6 = e10?.call(this);
        r11?.call(this, s7), this.requestUpdate(t6, h6, i9);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t6) {
      return this.elementProperties.get(t6) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t6 = n2(this);
      t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t7 = this.properties, s6 = [...r2(t7), ...o2(t7)];
        for (const i9 of s6) this.createProperty(i9, t7[i9]);
      }
      const t6 = this[Symbol.metadata];
      if (null !== t6) {
        const s6 = litPropertyMetadata.get(t6);
        if (void 0 !== s6) for (const [t7, i9] of s6) this.elementProperties.set(t7, i9);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t7, s6] of this.elementProperties) {
        const i9 = this._$Eu(t7, s6);
        void 0 !== i9 && this._$Eh.set(i9, t7);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i9 = [];
      if (Array.isArray(s6)) {
        const e10 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e10) i9.unshift(c(s7));
      } else void 0 !== s6 && i9.push(c(s6));
      return i9;
    }
    static _$Eu(t6, s6) {
      const i9 = s6.attribute;
      return false === i9 ? void 0 : "string" == typeof i9 ? i9 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
    }
    addController(t6) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
    }
    removeController(t6) {
      this._$EO?.delete(t6);
    }
    _$E_() {
      const t6 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i9 of s6.keys()) this.hasOwnProperty(i9) && (t6.set(i9, this[i9]), delete this[i9]);
      t6.size > 0 && (this._$Ep = t6);
    }
    createRenderRoot() {
      const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t6, this.constructor.elementStyles), t6;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
    }
    enableUpdating(t6) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t6) => t6.hostDisconnected?.());
    }
    attributeChangedCallback(t6, s6, i9) {
      this._$AK(t6, i9);
    }
    _$ET(t6, s6) {
      const i9 = this.constructor.elementProperties.get(t6), e10 = this.constructor._$Eu(t6, i9);
      if (void 0 !== e10 && true === i9.reflect) {
        const h6 = (void 0 !== i9.converter?.toAttribute ? i9.converter : u).toAttribute(s6, i9.type);
        this._$Em = t6, null == h6 ? this.removeAttribute(e10) : this.setAttribute(e10, h6), this._$Em = null;
      }
    }
    _$AK(t6, s6) {
      const i9 = this.constructor, e10 = i9._$Eh.get(t6);
      if (void 0 !== e10 && this._$Em !== e10) {
        const t7 = i9.getPropertyOptions(e10), h6 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
        this._$Em = e10, this[e10] = h6.fromAttribute(s6, t7.type) ?? this._$Ej?.get(e10) ?? null, this._$Em = null;
      }
    }
    requestUpdate(t6, s6, i9) {
      if (void 0 !== t6) {
        const e10 = this.constructor, h6 = this[t6];
        if (i9 ??= e10.getPropertyOptions(t6), !((i9.hasChanged ?? f)(h6, s6) || i9.useDefault && i9.reflect && h6 === this._$Ej?.get(t6) && !this.hasAttribute(e10._$Eu(t6, i9)))) return;
        this.C(t6, s6, i9);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t6, s6, { useDefault: i9, reflect: e10, wrapped: h6 }, r11) {
      i9 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t6) && (this._$Ej.set(t6, r11 ?? s6 ?? this[t6]), true !== h6 || void 0 !== r11) || (this._$AL.has(t6) || (this.hasUpdated || i9 || (s6 = void 0), this._$AL.set(t6, s6)), true === e10 && this._$Em !== t6 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t6));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t7) {
        Promise.reject(t7);
      }
      const t6 = this.scheduleUpdate();
      return null != t6 && await t6, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t8, s7] of this._$Ep) this[t8] = s7;
          this._$Ep = void 0;
        }
        const t7 = this.constructor.elementProperties;
        if (t7.size > 0) for (const [s7, i9] of t7) {
          const { wrapped: t8 } = i9, e10 = this[s7];
          true !== t8 || this._$AL.has(s7) || void 0 === e10 || this.C(s7, void 0, i9, e10);
        }
      }
      let t6 = false;
      const s6 = this._$AL;
      try {
        t6 = this.shouldUpdate(s6), t6 ? (this.willUpdate(s6), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s6)) : this._$EM();
      } catch (s7) {
        throw t6 = false, this._$EM(), s7;
      }
      t6 && this._$AE(s6);
    }
    willUpdate(t6) {
    }
    _$AE(t6) {
      this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t6) {
      return true;
    }
    update(t6) {
      this._$Eq &&= this._$Eq.forEach((t7) => this._$ET(t7, this[t7])), this._$EM();
    }
    updated(t6) {
    }
    firstUpdated(t6) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.0");

  // node_modules/@lit/reactive-element/decorators/property.js
  var o3 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r3 = (t6 = o3, e10, r11) => {
    const { kind: n10, metadata: i9 } = r11;
    let s6 = globalThis.litPropertyMetadata.get(i9);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i9, s6 = /* @__PURE__ */ new Map()), "setter" === n10 && ((t6 = Object.create(t6)).wrapped = true), s6.set(r11.name, t6), "accessor" === n10) {
      const { name: o13 } = r11;
      return { set(r12) {
        const n11 = e10.get.call(this);
        e10.set.call(this, r12), this.requestUpdate(o13, n11, t6);
      }, init(e11) {
        return void 0 !== e11 && this.C(o13, void 0, t6, e11), e11;
      } };
    }
    if ("setter" === n10) {
      const { name: o13 } = r11;
      return function(r12) {
        const n11 = this[o13];
        e10.call(this, r12), this.requestUpdate(o13, n11, t6);
      };
    }
    throw Error("Unsupported decorator location: " + n10);
  };
  function n3(t6) {
    return (e10, o13) => "object" == typeof o13 ? r3(t6, e10, o13) : ((t7, e11, o14) => {
      const r11 = e11.hasOwnProperty(o14);
      return e11.constructor.createProperty(o14, t7), r11 ? Object.getOwnPropertyDescriptor(e11, o14) : void 0;
    })(t6, e10, o13);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r4(r11) {
    return n3({ ...r11, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e3 = (e10, t6, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e10, t6, c6), c6);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e4(e10, r11) {
    return (n10, s6, i9) => {
      const o13 = (t6) => t6.renderRoot?.querySelector(e10) ?? null;
      if (r11) {
        const { get: e11, set: r12 } = "object" == typeof s6 ? n10 : i9 ?? (() => {
          const t6 = Symbol();
          return { get() {
            return this[t6];
          }, set(e12) {
            this[t6] = e12;
          } };
        })();
        return e3(n10, s6, { get() {
          let t6 = e11.call(this);
          return void 0 === t6 && (t6 = o13(this), (null !== t6 || this.hasUpdated) && r12.call(this, t6)), t6;
        } });
      }
      return e3(n10, s6, { get() {
        return o13(this);
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var e5;
  function r5(r11) {
    return (n10, o13) => e3(n10, o13, { get() {
      return (this.renderRoot ?? (e5 ??= document.createDocumentFragment())).querySelectorAll(r11);
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-async.js
  function r6(r11) {
    return (n10, e10) => e3(n10, e10, { async get() {
      return await this.updateComplete, this.renderRoot?.querySelector(r11) ?? null;
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  function o4(o13) {
    return (e10, n10) => {
      const { slot: r11, selector: s6 } = o13 ?? {}, c6 = "slot" + (r11 ? `[name=${r11}]` : ":not([name])");
      return e3(e10, n10, { get() {
        const t6 = this.renderRoot?.querySelector(c6), e11 = t6?.assignedElements(o13) ?? [];
        return void 0 === s6 ? e11 : e11.filter((t7) => t7.matches(s6));
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  function n4(n10) {
    return (o13, r11) => {
      const { slot: e10 } = n10 ?? {}, s6 = "slot" + (e10 ? `[name=${e10}]` : ":not([name])");
      return e3(o13, r11, { get() {
        const t6 = this.renderRoot?.querySelector(s6);
        return t6?.assignedNodes(n10) ?? [];
      } });
    };
  }

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i3 = t3.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
  var e6 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o5 = "?" + h2;
  var n5 = `<${o5}>`;
  var r7 = document;
  var l2 = () => r7.createComment("");
  var c3 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
  var a2 = Array.isArray;
  var u2 = (t6) => a2(t6) || "function" == typeof t6?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t6) => (i9, ...s6) => ({ _$litType$: t6, strings: i9, values: s6 });
  var x = y2(1);
  var b2 = y2(2);
  var w = y2(3);
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r7.createTreeWalker(r7, 129);
  function P(t6, i9) {
    if (!a2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i9) : i9;
  }
  var V = (t6, i9) => {
    const s6 = t6.length - 1, o13 = [];
    let r11, l7 = 2 === i9 ? "<svg>" : 3 === i9 ? "<math>" : "", c6 = f2;
    for (let i10 = 0; i10 < s6; i10++) {
      const s7 = t6[i10];
      let a4, u5, d3 = -1, y3 = 0;
      for (; y3 < s7.length && (c6.lastIndex = y3, u5 = c6.exec(s7), null !== u5); ) y3 = c6.lastIndex, c6 === f2 ? "!--" === u5[1] ? c6 = v : void 0 !== u5[1] ? c6 = _ : void 0 !== u5[2] ? ($.test(u5[2]) && (r11 = RegExp("</" + u5[2], "g")), c6 = m) : void 0 !== u5[3] && (c6 = m) : c6 === m ? ">" === u5[0] ? (c6 = r11 ?? f2, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c6.lastIndex - u5[2].length, a4 = u5[1], c6 = void 0 === u5[3] ? m : '"' === u5[3] ? g : p2) : c6 === g || c6 === p2 ? c6 = m : c6 === v || c6 === _ ? c6 = f2 : (c6 = m, r11 = void 0);
      const x2 = c6 === m && t6[i10 + 1].startsWith("/>") ? " " : "";
      l7 += c6 === f2 ? s7 + n5 : d3 >= 0 ? (o13.push(a4), s7.slice(0, d3) + e6 + s7.slice(d3) + h2 + x2) : s7 + h2 + (-2 === d3 ? i10 : x2);
    }
    return [P(t6, l7 + (t6[s6] || "<?>") + (2 === i9 ? "</svg>" : 3 === i9 ? "</math>" : "")), o13];
  };
  var N = class _N {
    constructor({ strings: t6, _$litType$: s6 }, n10) {
      let r11;
      this.parts = [];
      let c6 = 0, a4 = 0;
      const u5 = t6.length - 1, d3 = this.parts, [f5, v2] = V(t6, s6);
      if (this.el = _N.createElement(f5, n10), C.currentNode = this.el.content, 2 === s6 || 3 === s6) {
        const t7 = this.el.content.firstChild;
        t7.replaceWith(...t7.childNodes);
      }
      for (; null !== (r11 = C.nextNode()) && d3.length < u5; ) {
        if (1 === r11.nodeType) {
          if (r11.hasAttributes()) for (const t7 of r11.getAttributeNames()) if (t7.endsWith(e6)) {
            const i9 = v2[a4++], s7 = r11.getAttribute(t7).split(h2), e10 = /([.?@])?(.*)/.exec(i9);
            d3.push({ type: 1, index: c6, name: e10[2], strings: s7, ctor: "." === e10[1] ? H : "?" === e10[1] ? I : "@" === e10[1] ? L : k }), r11.removeAttribute(t7);
          } else t7.startsWith(h2) && (d3.push({ type: 6, index: c6 }), r11.removeAttribute(t7));
          if ($.test(r11.tagName)) {
            const t7 = r11.textContent.split(h2), s7 = t7.length - 1;
            if (s7 > 0) {
              r11.textContent = i3 ? i3.emptyScript : "";
              for (let i9 = 0; i9 < s7; i9++) r11.append(t7[i9], l2()), C.nextNode(), d3.push({ type: 2, index: ++c6 });
              r11.append(t7[s7], l2());
            }
          }
        } else if (8 === r11.nodeType) if (r11.data === o5) d3.push({ type: 2, index: c6 });
        else {
          let t7 = -1;
          for (; -1 !== (t7 = r11.data.indexOf(h2, t7 + 1)); ) d3.push({ type: 7, index: c6 }), t7 += h2.length - 1;
        }
        c6++;
      }
    }
    static createElement(t6, i9) {
      const s6 = r7.createElement("template");
      return s6.innerHTML = t6, s6;
    }
  };
  function S2(t6, i9, s6 = t6, e10) {
    if (i9 === T) return i9;
    let h6 = void 0 !== e10 ? s6._$Co?.[e10] : s6._$Cl;
    const o13 = c3(i9) ? void 0 : i9._$litDirective$;
    return h6?.constructor !== o13 && (h6?._$AO?.(false), void 0 === o13 ? h6 = void 0 : (h6 = new o13(t6), h6._$AT(t6, s6, e10)), void 0 !== e10 ? (s6._$Co ??= [])[e10] = h6 : s6._$Cl = h6), void 0 !== h6 && (i9 = S2(t6, h6._$AS(t6, i9.values), h6, e10)), i9;
  }
  var M = class {
    constructor(t6, i9) {
      this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i9;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t6) {
      const { el: { content: i9 }, parts: s6 } = this._$AD, e10 = (t6?.creationScope ?? r7).importNode(i9, true);
      C.currentNode = e10;
      let h6 = C.nextNode(), o13 = 0, n10 = 0, l7 = s6[0];
      for (; void 0 !== l7; ) {
        if (o13 === l7.index) {
          let i10;
          2 === l7.type ? i10 = new R(h6, h6.nextSibling, this, t6) : 1 === l7.type ? i10 = new l7.ctor(h6, l7.name, l7.strings, this, t6) : 6 === l7.type && (i10 = new z(h6, this, t6)), this._$AV.push(i10), l7 = s6[++n10];
        }
        o13 !== l7?.index && (h6 = C.nextNode(), o13++);
      }
      return C.currentNode = r7, e10;
    }
    p(t6) {
      let i9 = 0;
      for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t6, s6, i9), i9 += s6.strings.length - 2) : s6._$AI(t6[i9])), i9++;
    }
  };
  var R = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t6, i9, s6, e10) {
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t6, this._$AB = i9, this._$AM = s6, this.options = e10, this._$Cv = e10?.isConnected ?? true;
    }
    get parentNode() {
      let t6 = this._$AA.parentNode;
      const i9 = this._$AM;
      return void 0 !== i9 && 11 === t6?.nodeType && (t6 = i9.parentNode), t6;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t6, i9 = this) {
      t6 = S2(this, t6, i9), c3(t6) ? t6 === E || null == t6 || "" === t6 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t6 !== this._$AH && t6 !== T && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : u2(t6) ? this.k(t6) : this._(t6);
    }
    O(t6) {
      return this._$AA.parentNode.insertBefore(t6, this._$AB);
    }
    T(t6) {
      this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
    }
    _(t6) {
      this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(r7.createTextNode(t6)), this._$AH = t6;
    }
    $(t6) {
      const { values: i9, _$litType$: s6 } = t6, e10 = "number" == typeof s6 ? this._$AC(t6) : (void 0 === s6.el && (s6.el = N.createElement(P(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e10) this._$AH.p(i9);
      else {
        const t7 = new M(e10, this), s7 = t7.u(this.options);
        t7.p(i9), this.T(s7), this._$AH = t7;
      }
    }
    _$AC(t6) {
      let i9 = A.get(t6.strings);
      return void 0 === i9 && A.set(t6.strings, i9 = new N(t6)), i9;
    }
    k(t6) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i9 = this._$AH;
      let s6, e10 = 0;
      for (const h6 of t6) e10 === i9.length ? i9.push(s6 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s6 = i9[e10], s6._$AI(h6), e10++;
      e10 < i9.length && (this._$AR(s6 && s6._$AB.nextSibling, e10), i9.length = e10);
    }
    _$AR(t6 = this._$AA.nextSibling, i9) {
      for (this._$AP?.(false, true, i9); t6 && t6 !== this._$AB; ) {
        const i10 = t6.nextSibling;
        t6.remove(), t6 = i10;
      }
    }
    setConnected(t6) {
      void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t6, i9, s6, e10, h6) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t6, this.name = i9, this._$AM = e10, this.options = h6, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = E;
    }
    _$AI(t6, i9 = this, s6, e10) {
      const h6 = this.strings;
      let o13 = false;
      if (void 0 === h6) t6 = S2(this, t6, i9, 0), o13 = !c3(t6) || t6 !== this._$AH && t6 !== T, o13 && (this._$AH = t6);
      else {
        const e11 = t6;
        let n10, r11;
        for (t6 = h6[0], n10 = 0; n10 < h6.length - 1; n10++) r11 = S2(this, e11[s6 + n10], i9, n10), r11 === T && (r11 = this._$AH[n10]), o13 ||= !c3(r11) || r11 !== this._$AH[n10], r11 === E ? t6 = E : t6 !== E && (t6 += (r11 ?? "") + h6[n10 + 1]), this._$AH[n10] = r11;
      }
      o13 && !e10 && this.j(t6);
    }
    j(t6) {
      t6 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t6) {
      this.element[this.name] = t6 === E ? void 0 : t6;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t6) {
      this.element.toggleAttribute(this.name, !!t6 && t6 !== E);
    }
  };
  var L = class extends k {
    constructor(t6, i9, s6, e10, h6) {
      super(t6, i9, s6, e10, h6), this.type = 5;
    }
    _$AI(t6, i9 = this) {
      if ((t6 = S2(this, t6, i9, 0) ?? E) === T) return;
      const s6 = this._$AH, e10 = t6 === E && s6 !== E || t6.capture !== s6.capture || t6.once !== s6.once || t6.passive !== s6.passive, h6 = t6 !== E && (s6 === E || e10);
      e10 && this.element.removeEventListener(this.name, this, s6), h6 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
    }
    handleEvent(t6) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
    }
  };
  var z = class {
    constructor(t6, i9, s6) {
      this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i9, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6) {
      S2(this, t6);
    }
  };
  var Z = { M: e6, P: h2, A: o5, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
  var j = t3.litHtmlPolyfillSupport;
  j?.(N, R), (t3.litHtmlVersions ??= []).push("3.3.0");
  var B = (t6, i9, s6) => {
    const e10 = s6?.renderBefore ?? i9;
    let h6 = e10._$litPart$;
    if (void 0 === h6) {
      const t7 = s6?.renderBefore ?? null;
      e10._$litPart$ = h6 = new R(i9.insertBefore(l2(), t7), t7, void 0, s6 ?? {});
    }
    return h6._$AI(t6), h6;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t6 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t6.firstChild, t6;
    }
    update(t6) {
      const r11 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = B(r11, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o6 = s3.litElementPolyfillSupport;
  o6?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.0");

  // node_modules/lit-html/is-server.js
  var o7 = false;

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e7 = (t6) => (...e10) => ({ _$litDirective$: t6, values: e10 });
  var i5 = class {
    constructor(t6) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t6, e10, i9) {
      this._$Ct = t6, this._$AM = e10, this._$Ci = i9;
    }
    _$AS(t6, e10) {
      return this.update(t6, e10);
    }
    update(t6, e10) {
      return this.render(...e10);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e8 = e7(class extends i5 {
    constructor(t6) {
      if (super(t6), t6.type !== t4.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t6) {
      return " " + Object.keys(t6).filter((s6) => t6[s6]).join(" ") + " ";
    }
    update(s6, [i9]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s6.strings && (this.nt = new Set(s6.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
        for (const t6 in i9) i9[t6] && !this.nt?.has(t6) && this.st.add(t6);
        return this.render(i9);
      }
      const r11 = s6.element.classList;
      for (const t6 of this.st) t6 in i9 || (r11.remove(t6), this.st.delete(t6));
      for (const t6 in i9) {
        const s7 = !!i9[t6];
        s7 === this.st.has(t6) || this.nt?.has(t6) || (s7 ? (r11.add(t6), this.st.add(t6)) : (r11.remove(t6), this.st.delete(t6)));
      }
      return T;
    }
  });

  // node_modules/@material/web/internal/aria/aria.js
  var ARIA_PROPERTIES = [
    "role",
    "ariaAtomic",
    "ariaAutoComplete",
    "ariaBusy",
    "ariaChecked",
    "ariaColCount",
    "ariaColIndex",
    "ariaColSpan",
    "ariaCurrent",
    "ariaDisabled",
    "ariaExpanded",
    "ariaHasPopup",
    "ariaHidden",
    "ariaInvalid",
    "ariaKeyShortcuts",
    "ariaLabel",
    "ariaLevel",
    "ariaLive",
    "ariaModal",
    "ariaMultiLine",
    "ariaMultiSelectable",
    "ariaOrientation",
    "ariaPlaceholder",
    "ariaPosInSet",
    "ariaPressed",
    "ariaReadOnly",
    "ariaRequired",
    "ariaRoleDescription",
    "ariaRowCount",
    "ariaRowIndex",
    "ariaRowSpan",
    "ariaSelected",
    "ariaSetSize",
    "ariaSort",
    "ariaValueMax",
    "ariaValueMin",
    "ariaValueNow",
    "ariaValueText"
  ];
  var ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);
  function isAriaAttribute(attribute) {
    return ARIA_ATTRIBUTES.includes(attribute);
  }
  function ariaPropertyToAttribute(property) {
    return property.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
  }

  // node_modules/@material/web/internal/aria/delegate.js
  var privateIgnoreAttributeChangesFor = Symbol("privateIgnoreAttributeChangesFor");
  function mixinDelegatesAria(base) {
    var _a2;
    if (o7) {
      return base;
    }
    class WithDelegatesAriaElement extends base {
      constructor() {
        super(...arguments);
        this[_a2] = /* @__PURE__ */ new Set();
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (!isAriaAttribute(name)) {
          super.attributeChangedCallback(name, oldValue, newValue);
          return;
        }
        if (this[privateIgnoreAttributeChangesFor].has(name)) {
          return;
        }
        this[privateIgnoreAttributeChangesFor].add(name);
        this.removeAttribute(name);
        this[privateIgnoreAttributeChangesFor].delete(name);
        const dataProperty = ariaAttributeToDataProperty(name);
        if (newValue === null) {
          delete this.dataset[dataProperty];
        } else {
          this.dataset[dataProperty] = newValue;
        }
        this.requestUpdate(ariaAttributeToDataProperty(name), oldValue);
      }
      getAttribute(name) {
        if (isAriaAttribute(name)) {
          return super.getAttribute(ariaAttributeToDataAttribute(name));
        }
        return super.getAttribute(name);
      }
      removeAttribute(name) {
        super.removeAttribute(name);
        if (isAriaAttribute(name)) {
          super.removeAttribute(ariaAttributeToDataAttribute(name));
          this.requestUpdate();
        }
      }
    }
    _a2 = privateIgnoreAttributeChangesFor;
    setupDelegatesAriaProperties(WithDelegatesAriaElement);
    return WithDelegatesAriaElement;
  }
  function setupDelegatesAriaProperties(ctor) {
    for (const ariaProperty of ARIA_PROPERTIES) {
      const ariaAttribute = ariaPropertyToAttribute(ariaProperty);
      const dataAttribute = ariaAttributeToDataAttribute(ariaAttribute);
      const dataProperty = ariaAttributeToDataProperty(ariaAttribute);
      ctor.createProperty(ariaProperty, {
        attribute: ariaAttribute,
        noAccessor: true
      });
      ctor.createProperty(Symbol(dataAttribute), {
        attribute: dataAttribute,
        noAccessor: true
      });
      Object.defineProperty(ctor.prototype, ariaProperty, {
        configurable: true,
        enumerable: true,
        get() {
          return this.dataset[dataProperty] ?? null;
        },
        set(value) {
          const prevValue = this.dataset[dataProperty] ?? null;
          if (value === prevValue) {
            return;
          }
          if (value === null) {
            delete this.dataset[dataProperty];
          } else {
            this.dataset[dataProperty] = value;
          }
          this.requestUpdate(ariaProperty, prevValue);
        }
      });
    }
  }
  function ariaAttributeToDataAttribute(ariaAttribute) {
    return `data-${ariaAttribute}`;
  }
  function ariaAttributeToDataProperty(ariaAttribute) {
    return ariaAttribute.replace(/-\w/, (dashLetter) => dashLetter[1].toUpperCase());
  }

  // node_modules/@material/web/progress/internal/progress.js
  var progressBaseClass = mixinDelegatesAria(i4);
  var Progress = class extends progressBaseClass {
    constructor() {
      super(...arguments);
      this.value = 0;
      this.max = 1;
      this.indeterminate = false;
      this.fourColor = false;
    }
    render() {
      const { ariaLabel } = this;
      return x`
      <div
        class="progress ${e8(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${ariaLabel || E}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? E : this.value}
        >${this.renderIndicator()}</div
      >
    `;
    }
    getRenderClasses() {
      return {
        "indeterminate": this.indeterminate,
        "four-color": this.fourColor
      };
    }
  };
  __decorate([
    n3({ type: Number })
  ], Progress.prototype, "value", void 0);
  __decorate([
    n3({ type: Number })
  ], Progress.prototype, "max", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Progress.prototype, "indeterminate", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "four-color" })
  ], Progress.prototype, "fourColor", void 0);

  // node_modules/@material/web/progress/internal/circular-progress.js
  var CircularProgress = class extends Progress {
    renderIndicator() {
      if (this.indeterminate) {
        return this.renderIndeterminateContainer();
      }
      return this.renderDeterminateContainer();
    }
    // Determinate mode is rendered with an svg so the progress arc can be
    // easily animated via stroke-dashoffset.
    renderDeterminateContainer() {
      const dashOffset = (1 - this.value / this.max) * 100;
      return x`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${dashOffset}></circle>
      </svg>
    `;
    }
    // Indeterminate mode rendered with 2 bordered-divs. The borders are
    // clipped into half circles by their containers. The divs are then carefully
    // animated to produce changes to the spinner arc size.
    // This approach has 4.5x the FPS of rendering via svg on Chrome 111.
    // See https://lit.dev/playground/#gist=febb773565272f75408ab06a0eb49746.
    renderIndeterminateContainer() {
      return x` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`;
    }
  };

  // node_modules/@material/web/progress/internal/circular-progress-styles.js
  var styles = i`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;

  // node_modules/@material/web/progress/circular-progress.js
  var MdCircularProgress = class MdCircularProgress2 extends CircularProgress {
  };
  MdCircularProgress.styles = [styles];
  MdCircularProgress = __decorate([
    t("md-circular-progress")
  ], MdCircularProgress);

  // src/constants.ts
  var RUN_MACRO_ENDPOINT_URL = "/run-macro";
  var CONFIG_DEFAULT = {
    aiConfig: "smart",
    checkedLanguages: [],
    enableConversationMode: false,
    enableEarcons: false,
    expandAtOrigin: false,
    initialPhrases: [],
    initialPhrasesPerLanguage: {},
    messageHistoryWithPrefix: [],
    persona: "",
    sentenceSmallMargin: false,
    ttsVoice: "",
    voicePitch: 0,
    voiceSpeakingRate: 0
  };
  var LARGE_MARGIN_LINE_LIMIT = 4;

  // src/macro-api-client.ts
  function parseResponse(response, num) {
    response = response.replaceAll("\\\n", "");
    return response.split("\n").map((text) => text.trim()).filter((text) => text.match(/^[0-9]+\./)).slice(0, num).map((text) => text.replace(/^\d+\.\s?/, ""));
  }
  var MacroApiClient = class _MacroApiClient {
    constructor() {
      this.fetchAbortController = null;
    }
    /**
     * Aborts fetching results from the endpoint.
     */
    abortFetch() {
      this.fetchAbortController?.abort();
    }
    /**
     * Fetches suggestions for the given input.
     * @param textValue Input text
     * @param language Input text's language
     * @param model Language model to use
     * @param context Context data
     * @returns A promise for a set of lists of result strings or null if the request is aborted / failed
     */
    async fetchSuggestions(textValue, language, model, context) {
      this.fetchAbortController?.abort();
      this.fetchAbortController = new AbortController();
      const abortSignal = this.fetchAbortController.signal;
      const wordMacroId = context.wordMacroId;
      const num = "5";
      const userInputs = {
        language,
        // [[language]]
        num,
        // [[num]]
        text: textValue,
        // [[text]]
        persona: context.persona,
        lastOutputSpeech: context.lastOutputSpeech,
        lastInputSpeech: context.lastInputSpeech,
        conversationHistory: context.conversationHistory,
        sentenceEmotion: context.sentenceEmotion
      };
      const wordsFetch = _MacroApiClient.fetchSuggestion(
        userInputs,
        abortSignal,
        wordMacroId,
        model
      );
      const sentenceMacroId = context.sentenceMacroId;
      const sentencesFetch = _MacroApiClient.fetchSuggestion(
        userInputs,
        abortSignal,
        sentenceMacroId,
        model
      );
      const result = Promise.all([sentencesFetch, wordsFetch]).catch((err) => {
        if (err instanceof DOMException) {
          console.log("Request was aborted by user:", userInputs);
        } else {
          alert(`Failed to access Gemini server or ${err || "something"}.`);
        }
        return null;
      });
      return result;
    }
    static async fetchSuggestion(userInputs, abortSignal, macroId, model, temperature = 0) {
      const text = await _MacroApiClient.fetchMacro(
        userInputs,
        abortSignal,
        macroId,
        model,
        temperature
      );
      return parseResponse(text, +userInputs.num);
    }
    /**
     * Fetches a response text for the given input and macro.
     * @param userInputs Input text
     * @param abortSignal Abort signal for the request
     * @param macroId Macro ID
     * @param model Language model to use
     * @param temperature Temperature parameter
     * @returns A promise for a response text
     */
    static async fetchMacro(userInputs, abortSignal, macroId, model, temperature) {
      const formData = new FormData();
      formData.append("id", macroId);
      formData.append("userInputs", JSON.stringify(userInputs));
      formData.append("temperature", `${temperature}`);
      formData.append("model_id", model);
      formData.append("_csrf_token", document.body.dataset.csrfToken || "");
      const extractText = (data) => {
        if (!(data instanceof Object && "messages" in data)) {
          throw new Error("API response doesn't have messages");
        }
        if (!Array.isArray(data.messages) || data.messages.length === 0) {
          return "";
        }
        return data.messages[0].text;
      };
      const text = fetch(RUN_MACRO_ENDPOINT_URL, {
        method: "POST",
        body: formData,
        signal: abortSignal
      }).then((res) => res.json()).then(extractText);
      return text;
    }
  };

  // src/pv-button.ts
  var PvButtonElement = class extends i4 {
    constructor() {
      super(...arguments);
      this.label = "";
      this.active = false;
    }
    render() {
      return x`<button>${this.label}</button>`;
    }
  };
  PvButtonElement.styles = i`
    :host {
      display: inline-block;
    }

    :host([active]) button,
    button:hover {
      background: var(--color-primary, yellow);
    }

    :host([rounded]) button {
      border-color: #f28b82;
      border-radius: 5vh;
    }

    :host([emotion]) button {
      border-color: #f98ec9;
    }

    button {
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: min(5vh, 3rem);
      padding: 0 1rem;
    }
  `;
  __decorateClass([
    n3({ type: String })
  ], PvButtonElement.prototype, "label", 2);
  __decorateClass([
    n3({ type: Boolean })
  ], PvButtonElement.prototype, "active", 2);
  PvButtonElement = __decorateClass([
    t("pv-button")
  ], PvButtonElement);

  // node_modules/signal-polyfill/dist/index.js
  var __defProp2 = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg3) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg3);
  };
  var __privateIn = (member, obj) => {
    if (Object(obj) !== obj)
      throw TypeError('Cannot use the "in" operator on this value');
    return member.has(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };
  function defaultEquals(a4, b3) {
    return Object.is(a4, b3);
  }
  var activeConsumer = null;
  var inNotificationPhase = false;
  var epoch = 1;
  var SIGNAL = /* @__PURE__ */ Symbol("SIGNAL");
  function setActiveConsumer(consumer) {
    const prev = activeConsumer;
    activeConsumer = consumer;
    return prev;
  }
  function getActiveConsumer() {
    return activeConsumer;
  }
  function isInNotificationPhase() {
    return inNotificationPhase;
  }
  var REACTIVE_NODE = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: false,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: false,
    consumerIsAlwaysLive: false,
    producerMustRecompute: () => false,
    producerRecomputeValue: () => {
    },
    consumerMarkedDirty: () => {
    },
    consumerOnSignalRead: () => {
    }
  };
  function producerAccessed(node) {
    if (inNotificationPhase) {
      throw new Error(
        typeof ngDevMode !== "undefined" && ngDevMode ? `Assertion error: signal read during notification phase` : ""
      );
    }
    if (activeConsumer === null) {
      return;
    }
    activeConsumer.consumerOnSignalRead(node);
    const idx = activeConsumer.nextProducerIndex++;
    assertConsumerNode(activeConsumer);
    if (idx < activeConsumer.producerNode.length && activeConsumer.producerNode[idx] !== node) {
      if (consumerIsLive(activeConsumer)) {
        const staleProducer = activeConsumer.producerNode[idx];
        producerRemoveLiveConsumerAtIndex(staleProducer, activeConsumer.producerIndexOfThis[idx]);
      }
    }
    if (activeConsumer.producerNode[idx] !== node) {
      activeConsumer.producerNode[idx] = node;
      activeConsumer.producerIndexOfThis[idx] = consumerIsLive(activeConsumer) ? producerAddLiveConsumer(node, activeConsumer, idx) : 0;
    }
    activeConsumer.producerLastReadVersion[idx] = node.version;
  }
  function producerIncrementEpoch() {
    epoch++;
  }
  function producerUpdateValueVersion(node) {
    if (!node.dirty && node.lastCleanEpoch === epoch) {
      return;
    }
    if (!node.producerMustRecompute(node) && !consumerPollProducersForChange(node)) {
      node.dirty = false;
      node.lastCleanEpoch = epoch;
      return;
    }
    node.producerRecomputeValue(node);
    node.dirty = false;
    node.lastCleanEpoch = epoch;
  }
  function producerNotifyConsumers(node) {
    if (node.liveConsumerNode === void 0) {
      return;
    }
    const prev = inNotificationPhase;
    inNotificationPhase = true;
    try {
      for (const consumer of node.liveConsumerNode) {
        if (!consumer.dirty) {
          consumerMarkDirty(consumer);
        }
      }
    } finally {
      inNotificationPhase = prev;
    }
  }
  function producerUpdatesAllowed() {
    return (activeConsumer == null ? void 0 : activeConsumer.consumerAllowSignalWrites) !== false;
  }
  function consumerMarkDirty(node) {
    var _a2;
    node.dirty = true;
    producerNotifyConsumers(node);
    (_a2 = node.consumerMarkedDirty) == null ? void 0 : _a2.call(node.wrapper ?? node);
  }
  function consumerBeforeComputation(node) {
    node && (node.nextProducerIndex = 0);
    return setActiveConsumer(node);
  }
  function consumerAfterComputation(node, prevConsumer) {
    setActiveConsumer(prevConsumer);
    if (!node || node.producerNode === void 0 || node.producerIndexOfThis === void 0 || node.producerLastReadVersion === void 0) {
      return;
    }
    if (consumerIsLive(node)) {
      for (let i9 = node.nextProducerIndex; i9 < node.producerNode.length; i9++) {
        producerRemoveLiveConsumerAtIndex(node.producerNode[i9], node.producerIndexOfThis[i9]);
      }
    }
    while (node.producerNode.length > node.nextProducerIndex) {
      node.producerNode.pop();
      node.producerLastReadVersion.pop();
      node.producerIndexOfThis.pop();
    }
  }
  function consumerPollProducersForChange(node) {
    assertConsumerNode(node);
    for (let i9 = 0; i9 < node.producerNode.length; i9++) {
      const producer = node.producerNode[i9];
      const seenVersion = node.producerLastReadVersion[i9];
      if (seenVersion !== producer.version) {
        return true;
      }
      producerUpdateValueVersion(producer);
      if (seenVersion !== producer.version) {
        return true;
      }
    }
    return false;
  }
  function producerAddLiveConsumer(node, consumer, indexOfThis) {
    var _a2;
    assertProducerNode(node);
    assertConsumerNode(node);
    if (node.liveConsumerNode.length === 0) {
      (_a2 = node.watched) == null ? void 0 : _a2.call(node.wrapper);
      for (let i9 = 0; i9 < node.producerNode.length; i9++) {
        node.producerIndexOfThis[i9] = producerAddLiveConsumer(node.producerNode[i9], node, i9);
      }
    }
    node.liveConsumerIndexOfThis.push(indexOfThis);
    return node.liveConsumerNode.push(consumer) - 1;
  }
  function producerRemoveLiveConsumerAtIndex(node, idx) {
    var _a2;
    assertProducerNode(node);
    assertConsumerNode(node);
    if (typeof ngDevMode !== "undefined" && ngDevMode && idx >= node.liveConsumerNode.length) {
      throw new Error(
        `Assertion error: active consumer index ${idx} is out of bounds of ${node.liveConsumerNode.length} consumers)`
      );
    }
    if (node.liveConsumerNode.length === 1) {
      (_a2 = node.unwatched) == null ? void 0 : _a2.call(node.wrapper);
      for (let i9 = 0; i9 < node.producerNode.length; i9++) {
        producerRemoveLiveConsumerAtIndex(node.producerNode[i9], node.producerIndexOfThis[i9]);
      }
    }
    const lastIdx = node.liveConsumerNode.length - 1;
    node.liveConsumerNode[idx] = node.liveConsumerNode[lastIdx];
    node.liveConsumerIndexOfThis[idx] = node.liveConsumerIndexOfThis[lastIdx];
    node.liveConsumerNode.length--;
    node.liveConsumerIndexOfThis.length--;
    if (idx < node.liveConsumerNode.length) {
      const idxProducer = node.liveConsumerIndexOfThis[idx];
      const consumer = node.liveConsumerNode[idx];
      assertConsumerNode(consumer);
      consumer.producerIndexOfThis[idxProducer] = idx;
    }
  }
  function consumerIsLive(node) {
    var _a2;
    return node.consumerIsAlwaysLive || (((_a2 = node == null ? void 0 : node.liveConsumerNode) == null ? void 0 : _a2.length) ?? 0) > 0;
  }
  function assertConsumerNode(node) {
    node.producerNode ?? (node.producerNode = []);
    node.producerIndexOfThis ?? (node.producerIndexOfThis = []);
    node.producerLastReadVersion ?? (node.producerLastReadVersion = []);
  }
  function assertProducerNode(node) {
    node.liveConsumerNode ?? (node.liveConsumerNode = []);
    node.liveConsumerIndexOfThis ?? (node.liveConsumerIndexOfThis = []);
  }
  function computedGet(node) {
    producerUpdateValueVersion(node);
    producerAccessed(node);
    if (node.value === ERRORED) {
      throw node.error;
    }
    return node.value;
  }
  function createComputed(computation) {
    const node = Object.create(COMPUTED_NODE);
    node.computation = computation;
    const computed = () => computedGet(node);
    computed[SIGNAL] = node;
    return computed;
  }
  var UNSET = /* @__PURE__ */ Symbol("UNSET");
  var COMPUTING = /* @__PURE__ */ Symbol("COMPUTING");
  var ERRORED = /* @__PURE__ */ Symbol("ERRORED");
  var COMPUTED_NODE = /* @__PURE__ */ (() => {
    return {
      ...REACTIVE_NODE,
      value: UNSET,
      dirty: true,
      error: null,
      equal: defaultEquals,
      producerMustRecompute(node) {
        return node.value === UNSET || node.value === COMPUTING;
      },
      producerRecomputeValue(node) {
        if (node.value === COMPUTING) {
          throw new Error("Detected cycle in computations.");
        }
        const oldValue = node.value;
        node.value = COMPUTING;
        const prevConsumer = consumerBeforeComputation(node);
        let newValue;
        let wasEqual = false;
        try {
          newValue = node.computation.call(node.wrapper);
          const oldOk = oldValue !== UNSET && oldValue !== ERRORED;
          wasEqual = oldOk && node.equal.call(node.wrapper, oldValue, newValue);
        } catch (err) {
          newValue = ERRORED;
          node.error = err;
        } finally {
          consumerAfterComputation(node, prevConsumer);
        }
        if (wasEqual) {
          node.value = oldValue;
          return;
        }
        node.value = newValue;
        node.version++;
      }
    };
  })();
  function defaultThrowError() {
    throw new Error();
  }
  var throwInvalidWriteToSignalErrorFn = defaultThrowError;
  function throwInvalidWriteToSignalError() {
    throwInvalidWriteToSignalErrorFn();
  }
  function createSignal(initialValue) {
    const node = Object.create(SIGNAL_NODE);
    node.value = initialValue;
    const getter = () => {
      producerAccessed(node);
      return node.value;
    };
    getter[SIGNAL] = node;
    return getter;
  }
  function signalGetFn() {
    producerAccessed(this);
    return this.value;
  }
  function signalSetFn(node, newValue) {
    if (!producerUpdatesAllowed()) {
      throwInvalidWriteToSignalError();
    }
    if (!node.equal.call(node.wrapper, node.value, newValue)) {
      node.value = newValue;
      signalValueChanged(node);
    }
  }
  var SIGNAL_NODE = /* @__PURE__ */ (() => {
    return {
      ...REACTIVE_NODE,
      equal: defaultEquals,
      value: void 0
    };
  })();
  function signalValueChanged(node) {
    node.version++;
    producerIncrementEpoch();
    producerNotifyConsumers(node);
  }
  var NODE = Symbol("node");
  var Signal;
  ((Signal2) => {
    var _a2, _brand, brand_fn, _b, _brand2, brand_fn2;
    class State3 {
      constructor(initialValue, options = {}) {
        __privateAdd(this, _brand);
        __publicField(this, _a2);
        const ref = createSignal(initialValue);
        const node = ref[SIGNAL];
        this[NODE] = node;
        node.wrapper = this;
        if (options) {
          const equals = options.equals;
          if (equals) {
            node.equal = equals;
          }
          node.watched = options[Signal2.subtle.watched];
          node.unwatched = options[Signal2.subtle.unwatched];
        }
      }
      get() {
        if (!(0, Signal2.isState)(this))
          throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
        return signalGetFn.call(this[NODE]);
      }
      set(newValue) {
        if (!(0, Signal2.isState)(this))
          throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
        if (isInNotificationPhase()) {
          throw new Error("Writes to signals not permitted during Watcher callback");
        }
        const ref = this[NODE];
        signalSetFn(ref, newValue);
      }
    }
    _a2 = NODE;
    _brand = /* @__PURE__ */ new WeakSet();
    brand_fn = function() {
    };
    Signal2.isState = (s6) => typeof s6 === "object" && __privateIn(_brand, s6);
    Signal2.State = State3;
    class Computed {
      // Create a Signal which evaluates to the value returned by the callback.
      // Callback is called with this signal as the parameter.
      constructor(computation, options) {
        __privateAdd(this, _brand2);
        __publicField(this, _b);
        const ref = createComputed(computation);
        const node = ref[SIGNAL];
        node.consumerAllowSignalWrites = true;
        this[NODE] = node;
        node.wrapper = this;
        if (options) {
          const equals = options.equals;
          if (equals) {
            node.equal = equals;
          }
          node.watched = options[Signal2.subtle.watched];
          node.unwatched = options[Signal2.subtle.unwatched];
        }
      }
      get() {
        if (!(0, Signal2.isComputed)(this))
          throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
        return computedGet(this[NODE]);
      }
    }
    _b = NODE;
    _brand2 = /* @__PURE__ */ new WeakSet();
    brand_fn2 = function() {
    };
    Signal2.isComputed = (c6) => typeof c6 === "object" && __privateIn(_brand2, c6);
    Signal2.Computed = Computed;
    ((subtle2) => {
      var _a22, _brand3, brand_fn3, _assertSignals, assertSignals_fn;
      function untrack(cb) {
        let output;
        let prevActiveConsumer = null;
        try {
          prevActiveConsumer = setActiveConsumer(null);
          output = cb();
        } finally {
          setActiveConsumer(prevActiveConsumer);
        }
        return output;
      }
      subtle2.untrack = untrack;
      function introspectSources(sink) {
        var _a3;
        if (!(0, Signal2.isComputed)(sink) && !(0, Signal2.isWatcher)(sink)) {
          throw new TypeError("Called introspectSources without a Computed or Watcher argument");
        }
        return ((_a3 = sink[NODE].producerNode) == null ? void 0 : _a3.map((n10) => n10.wrapper)) ?? [];
      }
      subtle2.introspectSources = introspectSources;
      function introspectSinks(signal) {
        var _a3;
        if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) {
          throw new TypeError("Called introspectSinks without a Signal argument");
        }
        return ((_a3 = signal[NODE].liveConsumerNode) == null ? void 0 : _a3.map((n10) => n10.wrapper)) ?? [];
      }
      subtle2.introspectSinks = introspectSinks;
      function hasSinks(signal) {
        if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) {
          throw new TypeError("Called hasSinks without a Signal argument");
        }
        const liveConsumerNode = signal[NODE].liveConsumerNode;
        if (!liveConsumerNode)
          return false;
        return liveConsumerNode.length > 0;
      }
      subtle2.hasSinks = hasSinks;
      function hasSources(signal) {
        if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isWatcher)(signal)) {
          throw new TypeError("Called hasSources without a Computed or Watcher argument");
        }
        const producerNode = signal[NODE].producerNode;
        if (!producerNode)
          return false;
        return producerNode.length > 0;
      }
      subtle2.hasSources = hasSources;
      class Watcher {
        // When a (recursive) source of Watcher is written to, call this callback,
        // if it hasn't already been called since the last `watch` call.
        // No signals may be read or written during the notify.
        constructor(notify) {
          __privateAdd(this, _brand3);
          __privateAdd(this, _assertSignals);
          __publicField(this, _a22);
          let node = Object.create(REACTIVE_NODE);
          node.wrapper = this;
          node.consumerMarkedDirty = notify;
          node.consumerIsAlwaysLive = true;
          node.consumerAllowSignalWrites = false;
          node.producerNode = [];
          this[NODE] = node;
        }
        // Add these signals to the Watcher's set, and set the watcher to run its
        // notify callback next time any signal in the set (or one of its dependencies) changes.
        // Can be called with no arguments just to reset the "notified" state, so that
        // the notify callback will be invoked again.
        watch(...signals) {
          if (!(0, Signal2.isWatcher)(this)) {
            throw new TypeError("Called unwatch without Watcher receiver");
          }
          __privateMethod(this, _assertSignals, assertSignals_fn).call(this, signals);
          const node = this[NODE];
          node.dirty = false;
          const prev = setActiveConsumer(node);
          for (const signal of signals) {
            producerAccessed(signal[NODE]);
          }
          setActiveConsumer(prev);
        }
        // Remove these signals from the watched set (e.g., for an effect which is disposed)
        unwatch(...signals) {
          if (!(0, Signal2.isWatcher)(this)) {
            throw new TypeError("Called unwatch without Watcher receiver");
          }
          __privateMethod(this, _assertSignals, assertSignals_fn).call(this, signals);
          const node = this[NODE];
          assertConsumerNode(node);
          for (let i9 = node.producerNode.length - 1; i9 >= 0; i9--) {
            if (signals.includes(node.producerNode[i9].wrapper)) {
              producerRemoveLiveConsumerAtIndex(node.producerNode[i9], node.producerIndexOfThis[i9]);
              const lastIdx = node.producerNode.length - 1;
              node.producerNode[i9] = node.producerNode[lastIdx];
              node.producerIndexOfThis[i9] = node.producerIndexOfThis[lastIdx];
              node.producerNode.length--;
              node.producerIndexOfThis.length--;
              node.nextProducerIndex--;
              if (i9 < node.producerNode.length) {
                const idxConsumer = node.producerIndexOfThis[i9];
                const producer = node.producerNode[i9];
                assertProducerNode(producer);
                producer.liveConsumerIndexOfThis[idxConsumer] = i9;
              }
            }
          }
        }
        // Returns the set of computeds in the Watcher's set which are still yet
        // to be re-evaluated
        getPending() {
          if (!(0, Signal2.isWatcher)(this)) {
            throw new TypeError("Called getPending without Watcher receiver");
          }
          const node = this[NODE];
          return node.producerNode.filter((n10) => n10.dirty).map((n10) => n10.wrapper);
        }
      }
      _a22 = NODE;
      _brand3 = /* @__PURE__ */ new WeakSet();
      brand_fn3 = function() {
      };
      _assertSignals = /* @__PURE__ */ new WeakSet();
      assertSignals_fn = function(signals) {
        for (const signal of signals) {
          if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) {
            throw new TypeError("Called watch/unwatch without a Computed or State argument");
          }
        }
      };
      Signal2.isWatcher = (w2) => __privateIn(_brand3, w2);
      subtle2.Watcher = Watcher;
      function currentComputed() {
        var _a3;
        return (_a3 = getActiveConsumer()) == null ? void 0 : _a3.wrapper;
      }
      subtle2.currentComputed = currentComputed;
      subtle2.watched = Symbol("watched");
      subtle2.unwatched = Symbol("unwatched");
    })(Signal2.subtle || (Signal2.subtle = {}));
  })(Signal || (Signal = {}));

  // node_modules/@lit-labs/signals/lib/signal-watcher.js
  var i6 = Symbol("SignalWatcherBrand");
  var s4 = new FinalizationRegistry(({ watcher: t6, signal: i9 }) => {
    t6.unwatch(i9);
  });
  var h3 = /* @__PURE__ */ new WeakMap();
  function e9(e10) {
    return true === e10[i6] ? (console.warn("SignalWatcher should not be applied to the same class more than once."), e10) : class extends e10 {
      constructor() {
        super(...arguments), this._$St = new Signal.State(0), this._$Si = false, this._$So = true, this._$Sh = /* @__PURE__ */ new Set();
      }
      _$Sl() {
        if (void 0 !== this._$Su) return;
        this._$Sv = new Signal.Computed(() => {
          this._$St.get(), super.performUpdate();
        });
        const i9 = this._$Su = new Signal.subtle.Watcher(function() {
          const t6 = h3.get(this);
          void 0 !== t6 && (false === t6._$Si && t6.requestUpdate(), this.watch());
        });
        h3.set(i9, this), s4.register(this, { watcher: i9, signal: this._$Sv }), i9.watch(this._$Sv);
      }
      _$Sp() {
        void 0 !== this._$Su && (this._$Su.unwatch(this._$Sv), this._$Sv = void 0, this._$Su = void 0);
      }
      performUpdate() {
        this.isUpdatePending && (this._$Sl(), this._$Si = true, this._$St.set(this._$St.get() + 1), this._$Si = false, this._$Sv.get());
      }
      update(t6) {
        try {
          this._$So ? (this._$So = false, super.update(t6)) : this._$Sh.forEach((t7) => t7.commit());
        } finally {
          this.isUpdatePending = false, this._$Sh.clear();
        }
      }
      requestUpdate(t6, i9, s6) {
        this._$So = true, super.requestUpdate(t6, i9, s6);
      }
      connectedCallback() {
        super.connectedCallback(), this.requestUpdate();
      }
      disconnectedCallback() {
        super.disconnectedCallback(), queueMicrotask(() => {
          false === this.isConnected && this._$Sp();
        });
      }
      _(t6) {
        this._$Sh.add(t6);
        const i9 = this._$So;
        this.requestUpdate(), this._$So = i9;
      }
      m(t6) {
        this._$Sh.delete(t6);
      }
    };
  }

  // node_modules/lit-html/directive-helpers.js
  var { I: t5 } = Z;
  var f3 = (o13) => void 0 === o13.strings;
  var u3 = {};
  var m2 = (o13, t6 = u3) => o13._$AH = t6;

  // node_modules/lit-html/async-directive.js
  var s5 = (i9, t6) => {
    const e10 = i9._$AN;
    if (void 0 === e10) return false;
    for (const i10 of e10) i10._$AO?.(t6, false), s5(i10, t6);
    return true;
  };
  var o8 = (i9) => {
    let t6, e10;
    do {
      if (void 0 === (t6 = i9._$AM)) break;
      e10 = t6._$AN, e10.delete(i9), i9 = t6;
    } while (0 === e10?.size);
  };
  var r8 = (i9) => {
    for (let t6; t6 = i9._$AM; i9 = t6) {
      let e10 = t6._$AN;
      if (void 0 === e10) t6._$AN = e10 = /* @__PURE__ */ new Set();
      else if (e10.has(i9)) break;
      e10.add(i9), c4(t6);
    }
  };
  function h4(i9) {
    void 0 !== this._$AN ? (o8(this), this._$AM = i9, r8(this)) : this._$AM = i9;
  }
  function n6(i9, t6 = false, e10 = 0) {
    const r11 = this._$AH, h6 = this._$AN;
    if (void 0 !== h6 && 0 !== h6.size) if (t6) if (Array.isArray(r11)) for (let i10 = e10; i10 < r11.length; i10++) s5(r11[i10], false), o8(r11[i10]);
    else null != r11 && (s5(r11, false), o8(r11));
    else s5(this, i9);
  }
  var c4 = (i9) => {
    i9.type == t4.CHILD && (i9._$AP ??= n6, i9._$AQ ??= h4);
  };
  var f4 = class extends i5 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i9, t6, e10) {
      super._$AT(i9, t6, e10), r8(this), this.isConnected = i9._$AU;
    }
    _$AO(i9, t6 = true) {
      i9 !== this.isConnected && (this.isConnected = i9, i9 ? this.reconnected?.() : this.disconnected?.()), t6 && (s5(this, i9), o8(this));
    }
    setValue(t6) {
      if (f3(this._$Ct)) this._$Ct._$AI(t6, this);
      else {
        const i9 = [...this._$Ct._$AH];
        i9[this._$Ci] = t6, this._$Ct._$AI(i9, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/@lit-labs/signals/lib/watch.js
  var h5 = class extends f4 {
    _$Sl() {
      if (void 0 !== this._$Su) return;
      this._$SW = new Signal.Computed(() => {
        var i10;
        return null === (i10 = this._$Sj) || void 0 === i10 ? void 0 : i10.get();
      });
      const i9 = this._$Su = new Signal.subtle.Watcher(() => {
        var t6;
        null === (t6 = this._$SO) || void 0 === t6 || t6._(this), i9.watch();
      });
      i9.watch(this._$SW);
    }
    _$Sp() {
      var i9;
      void 0 !== this._$Su && (this._$Su.unwatch(this._$SW), this._$SW = void 0, this._$Su = void 0, null === (i9 = this._$SO) || void 0 === i9 || i9.m(this));
    }
    commit() {
      this.setValue(Signal.subtle.untrack(() => {
        var i9;
        return null === (i9 = this._$SW) || void 0 === i9 ? void 0 : i9.get();
      }));
    }
    render(i9) {
      return Signal.subtle.untrack(() => i9.get());
    }
    update(i9, [t6]) {
      var h6, o13;
      return null !== (h6 = this._$SO) && void 0 !== h6 || (this._$SO = null === (o13 = i9.options) || void 0 === o13 ? void 0 : o13.host), t6 !== this._$Sj && void 0 !== this._$Sj && this._$Sp(), this._$Sj = t6, this._$Sl(), Signal.subtle.untrack(() => this._$SW.get());
    }
    disconnected() {
      this._$Sp();
    }
    reconnected() {
      this._$Sl();
    }
  };
  var o9 = e7(h5);

  // node_modules/@lit-labs/signals/lib/html-tag.js
  var m3 = (o13) => (t6, ...m4) => o13(t6, ...m4.map((o14) => o14 instanceof Signal.State || o14 instanceof Signal.Computed ? o9(o14) : o14));
  var l3 = m3(x);
  var r9 = m3(b2);

  // node_modules/@lit-labs/signals/index.js
  var l4 = Signal.State;
  var o10 = Signal.Computed;
  var r10 = (l7, o13) => new Signal.State(l7, o13);

  // node_modules/lit-html/static.js
  var a3 = Symbol.for("");
  var o11 = (t6) => {
    if (t6?.r === a3) return t6?._$litStatic$;
  };
  var i7 = (t6, ...r11) => ({ _$litStatic$: r11.reduce((r12, e10, a4) => r12 + ((t7) => {
    if (void 0 !== t7._$litStatic$) return t7._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t7}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e10) + t6[a4 + 1], t6[0]), r: a3 });
  var l5 = /* @__PURE__ */ new Map();
  var n7 = (t6) => (r11, ...e10) => {
    const a4 = e10.length;
    let s6, i9;
    const n10 = [], u5 = [];
    let c6, $3 = 0, f5 = false;
    for (; $3 < a4; ) {
      for (c6 = r11[$3]; $3 < a4 && void 0 !== (i9 = e10[$3], s6 = o11(i9)); ) c6 += s6 + r11[++$3], f5 = true;
      $3 !== a4 && u5.push(i9), n10.push(c6), $3++;
    }
    if ($3 === a4 && n10.push(r11[a4]), f5) {
      const t7 = n10.join("$$lit$$");
      void 0 === (r11 = l5.get(t7)) && (n10.raw = n10, l5.set(t7, r11 = n10)), e10 = u5;
    }
    return t6(r11, ...e10);
  };
  var u4 = n7(x);
  var c5 = n7(b2);
  var $2 = n7(w);

  // src/pv-character-input.ts
  var PvCharacterInputElement = class extends e9(i4) {
    render() {
      return u4`<${this.state.keyboard} .state=${this.state}></${this.state.keyboard}>`;
    }
  };
  __decorateClass([
    n3({ type: Object })
  ], PvCharacterInputElement.prototype, "state", 2);
  PvCharacterInputElement = __decorateClass([
    t("pv-character-input")
  ], PvCharacterInputElement);

  // node_modules/@lit/localize/internal/locale-status-event.js
  var LOCALE_STATUS_EVENT = "lit-localize-status";

  // node_modules/@lit/localize/internal/str-tag.js
  var isStrTagged = (val) => typeof val !== "string" && "strTag" in val;
  var joinStringsAndValues = (strings, values, valueOrder) => {
    let concat = strings[0];
    for (let i9 = 1; i9 < strings.length; i9++) {
      concat += values[valueOrder ? valueOrder[i9 - 1] : i9 - 1];
      concat += strings[i9];
    }
    return concat;
  };

  // node_modules/@lit/localize/internal/default-msg.js
  var defaultMsg = (template) => isStrTagged(template) ? joinStringsAndValues(template.strings, template.values) : template;

  // node_modules/@lit/localize/init/install.js
  var msg = defaultMsg;
  var installed = false;
  function _installMsgImplementation(impl) {
    if (installed) {
      throw new Error("lit-localize can only be configured once");
    }
    msg = impl;
    installed = true;
  }

  // node_modules/@lit/localize/internal/localized-controller.js
  var LocalizeController = class {
    constructor(host) {
      this.__litLocalizeEventHandler = (event) => {
        if (event.detail.status === "ready") {
          this.host.requestUpdate();
        }
      };
      this.host = host;
    }
    hostConnected() {
      window.addEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
    }
    hostDisconnected() {
      window.removeEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
    }
  };
  var _updateWhenLocaleChanges = (host) => host.addController(new LocalizeController(host));
  var updateWhenLocaleChanges = _updateWhenLocaleChanges;

  // node_modules/@lit/localize/internal/localized-decorator.js
  var localized = () => (clazz, _context) => {
    clazz.addInitializer(updateWhenLocaleChanges);
    return clazz;
  };

  // node_modules/@lit/localize/internal/deferred.js
  var Deferred = class {
    constructor() {
      this.settled = false;
      this.promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
    resolve(value) {
      this.settled = true;
      this._resolve(value);
    }
    reject(error) {
      this.settled = true;
      this._reject(error);
    }
  };

  // node_modules/@lit/localize/internal/fnv1a64.js
  var hl = [];
  for (let i9 = 0; i9 < 256; i9++) {
    hl[i9] = (i9 >> 4 & 15).toString(16) + (i9 & 15).toString(16);
  }
  function fnv1a64(str2) {
    let t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t22 = 0, v2 = 40164, t32 = 0, v3 = 52210;
    for (let i9 = 0; i9 < str2.length; i9++) {
      v0 ^= str2.charCodeAt(i9);
      t0 = v0 * 435;
      t1 = v1 * 435;
      t22 = v2 * 435;
      t32 = v3 * 435;
      t22 += v0 << 8;
      t32 += v1 << 8;
      t1 += t0 >>> 16;
      v0 = t0 & 65535;
      t22 += t1 >>> 16;
      v1 = t1 & 65535;
      v3 = t32 + (t22 >>> 16) & 65535;
      v2 = t22 & 65535;
    }
    return hl[v3 >> 8] + hl[v3 & 255] + hl[v2 >> 8] + hl[v2 & 255] + hl[v1 >> 8] + hl[v1 & 255] + hl[v0 >> 8] + hl[v0 & 255];
  }

  // node_modules/@lit/localize/internal/id-generation.js
  var HASH_DELIMITER = "";
  var HTML_PREFIX = "h";
  var STRING_PREFIX = "s";
  function generateMsgId(strings, isHtmlTagged) {
    return (isHtmlTagged ? HTML_PREFIX : STRING_PREFIX) + fnv1a64(typeof strings === "string" ? strings : strings.join(HASH_DELIMITER));
  }

  // node_modules/@lit/localize/internal/runtime-msg.js
  var expressionOrders = /* @__PURE__ */ new WeakMap();
  var hashCache = /* @__PURE__ */ new Map();
  function runtimeMsg(templates3, template, options) {
    if (templates3) {
      const id = options?.id ?? generateId(template);
      const localized2 = templates3[id];
      if (localized2) {
        if (typeof localized2 === "string") {
          return localized2;
        } else if ("strTag" in localized2) {
          return joinStringsAndValues(
            localized2.strings,
            // Cast `template` because its type wasn't automatically narrowed (but
            // we know it must be the same type as `localized`).
            template.values,
            localized2.values
          );
        } else {
          let order = expressionOrders.get(localized2);
          if (order === void 0) {
            order = localized2.values;
            expressionOrders.set(localized2, order);
          }
          return {
            ...localized2,
            values: order.map((i9) => template.values[i9])
          };
        }
      }
    }
    return defaultMsg(template);
  }
  function generateId(template) {
    const strings = typeof template === "string" ? template : template.strings;
    let id = hashCache.get(strings);
    if (id === void 0) {
      id = generateMsgId(strings, typeof template !== "string" && !("strTag" in template));
      hashCache.set(strings, id);
    }
    return id;
  }

  // node_modules/@lit/localize/init/runtime.js
  function dispatchStatusEvent(detail) {
    window.dispatchEvent(new CustomEvent(LOCALE_STATUS_EVENT, { detail }));
  }
  var activeLocale = "";
  var loadingLocale;
  var sourceLocale;
  var validLocales;
  var loadLocale;
  var templates;
  var loading = new Deferred();
  loading.resolve();
  var requestId = 0;
  var configureLocalization = (config) => {
    _installMsgImplementation((template, options) => runtimeMsg(templates, template, options));
    activeLocale = sourceLocale = config.sourceLocale;
    validLocales = new Set(config.targetLocales);
    validLocales.add(config.sourceLocale);
    loadLocale = config.loadLocale;
    return { getLocale, setLocale };
  };
  var getLocale = () => {
    return activeLocale;
  };
  var setLocale = (newLocale) => {
    if (newLocale === (loadingLocale ?? activeLocale)) {
      return loading.promise;
    }
    if (!validLocales || !loadLocale) {
      throw new Error("Internal error");
    }
    if (!validLocales.has(newLocale)) {
      throw new Error("Invalid locale code");
    }
    requestId++;
    const thisRequestId = requestId;
    loadingLocale = newLocale;
    if (loading.settled) {
      loading = new Deferred();
    }
    dispatchStatusEvent({ status: "loading", loadingLocale: newLocale });
    const localePromise = newLocale === sourceLocale ? (
      // We could switch to the source locale synchronously, but we prefer to
      // queue it on a microtask so that switching locales is consistently
      // asynchronous.
      Promise.resolve({ templates: void 0 })
    ) : loadLocale(newLocale);
    localePromise.then((mod) => {
      if (requestId === thisRequestId) {
        activeLocale = newLocale;
        loadingLocale = void 0;
        templates = mod.templates;
        dispatchStatusEvent({ status: "ready", readyLocale: newLocale });
        loading.resolve();
      }
    }, (err) => {
      if (requestId === thisRequestId) {
        dispatchStatusEvent({
          status: "error",
          errorLocale: newLocale,
          errorMessage: err.toString()
        });
        loading.reject(err);
      }
    });
    return loading.promise;
  };

  // src/pv-conversation-history.ts
  var PvConversationHistory = class extends i4 {
    constructor() {
      super(...arguments);
      this.history = [];
    }
    // TODO(beketa): Use more robust way to split conversation history items.
    render() {
      return x`<header>
        <span class="icon">communication</span>${msg("Conversation")}
      </header>
      ${this.history.map(
        (turn) => x`<div class="turn">
            ${turn[1].split(", PartnerInput").map((item) => {
          const [speakerTag, content] = item.split(":");
          const speaker = speakerTag.startsWith("UserOutput") ? "user" : "partner";
          return x`<p class=${speaker}>${content}</p>`;
        })}
          </div>`
      )}`;
    }
  };
  PvConversationHistory.styles = i`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: scroll;
      padding-left: 0.5rem;
    }

    .turn {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    p {
      line-height: 1.2rem;
      margin: 0;
      max-width: 80%;
      padding: 0.5rem;
      width: fit-content;
    }

    .user {
      align-self: flex-end;
      background: var(--color-primary);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 0.25rem;
      color: var(--color-on-parimary);
    }

    .partner {
      align-self: flex-start;
      background: var(--color-secondary);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 1rem;
      color: var(--color-on-secondary);
    }

    header {
      align-items: center;
      display: flex;
      font-size: 1.2rem;
      font-weight: 500;
      gap: 0.5rem;
    }

    .icon {
      font-family: 'Material Symbols Outlined';
    }

    header .icon {
      font-size: 2rem;
    }
  `;
  __decorateClass([
    n3({ type: Array })
  ], PvConversationHistory.prototype, "history", 2);
  PvConversationHistory = __decorateClass([
    t("pv-conversation-history")
  ], PvConversationHistory);

  // node_modules/@material/web/icon/internal/icon.js
  var Icon = class extends i4 {
    render() {
      return x`<slot></slot>`;
    }
    connectedCallback() {
      super.connectedCallback();
      const ariaHidden = this.getAttribute("aria-hidden");
      if (ariaHidden === "false") {
        this.removeAttribute("aria-hidden");
        return;
      }
      this.setAttribute("aria-hidden", "true");
    }
  };

  // node_modules/@material/web/icon/internal/icon-styles.js
  var styles2 = i`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;

  // node_modules/@material/web/icon/icon.js
  var MdIcon = class MdIcon2 extends Icon {
  };
  MdIcon.styles = [styles2];
  MdIcon = __decorate([
    t("md-icon")
  ], MdIcon);

  // node_modules/@material/web/internal/controller/attachable-controller.js
  var ATTACHABLE_CONTROLLER = Symbol("attachableController");
  var FOR_ATTRIBUTE_OBSERVER;
  if (!o7) {
    FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
      for (const record of records) {
        record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
      }
    });
  }
  var AttachableController = class {
    get htmlFor() {
      return this.host.getAttribute("for");
    }
    set htmlFor(htmlFor) {
      if (htmlFor === null) {
        this.host.removeAttribute("for");
      } else {
        this.host.setAttribute("for", htmlFor);
      }
    }
    get control() {
      if (this.host.hasAttribute("for")) {
        if (!this.htmlFor || !this.host.isConnected) {
          return null;
        }
        return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
      }
      return this.currentControl || this.host.parentElement;
    }
    set control(control) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }
    /**
     * Creates a new controller for an `Attachable` element.
     *
     * @param host The `Attachable` element.
     * @param onControlChange A callback with two parameters for the previous and
     *     next control. An `Attachable` element may perform setup or teardown
     *     logic whenever the control changes.
     */
    constructor(host, onControlChange) {
      this.host = host;
      this.onControlChange = onControlChange;
      this.currentControl = null;
      host.addController(this);
      host[ATTACHABLE_CONTROLLER] = this;
      FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ["for"] });
    }
    attach(control) {
      if (control === this.currentControl) {
        return;
      }
      this.setCurrentControl(control);
      this.host.removeAttribute("for");
    }
    detach() {
      this.setCurrentControl(null);
      this.host.setAttribute("for", "");
    }
    /** @private */
    hostConnected() {
      this.setCurrentControl(this.control);
    }
    /** @private */
    hostDisconnected() {
      this.setCurrentControl(null);
    }
    setCurrentControl(control) {
      this.onControlChange(this.currentControl, control);
      this.currentControl = control;
    }
  };

  // node_modules/@material/web/focus/internal/focus-ring.js
  var EVENTS = ["focusin", "focusout", "pointerdown"];
  var FocusRing = class extends i4 {
    constructor() {
      super(...arguments);
      this.visible = false;
      this.inward = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    /** @private */
    handleEvent(event) {
      if (event[HANDLED_BY_FOCUS_RING]) {
        return;
      }
      switch (event.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
          break;
      }
      event[HANDLED_BY_FOCUS_RING] = true;
    }
    onControlChange(prev, next) {
      if (o7)
        return;
      for (const event of EVENTS) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
    update(changed) {
      if (changed.has("visible")) {
        this.dispatchEvent(new Event("visibility-changed"));
      }
      super.update(changed);
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "visible", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "inward", void 0);
  var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

  // node_modules/@material/web/focus/internal/focus-ring-styles.js
  var styles3 = i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;

  // node_modules/@material/web/focus/md-focus-ring.js
  var MdFocusRing = class MdFocusRing2 extends FocusRing {
  };
  MdFocusRing.styles = [styles3];
  MdFocusRing = __decorate([
    t("md-focus-ring")
  ], MdFocusRing);

  // node_modules/@material/web/internal/motion/animation.js
  var EASING = {
    STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
    STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
    STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
    EMPHASIZED: "cubic-bezier(.3,0,0,1)",
    EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
    EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
  };
  function createAnimationSignal() {
    let animationAbortController = null;
    return {
      start() {
        animationAbortController?.abort();
        animationAbortController = new AbortController();
        return animationAbortController.signal;
      },
      finish() {
        animationAbortController = null;
      }
    };
  }

  // node_modules/@material/web/ripple/internal/ripple.js
  var PRESS_GROW_MS = 450;
  var MINIMUM_PRESS_MS = 225;
  var INITIAL_ORIGIN_SCALE = 0.2;
  var PADDING = 10;
  var SOFT_EDGE_MINIMUM_SIZE = 75;
  var SOFT_EDGE_CONTAINER_RATIO = 0.35;
  var PRESS_PSEUDO = "::after";
  var ANIMATION_FILL = "forwards";
  var State;
  (function(State3) {
    State3[State3["INACTIVE"] = 0] = "INACTIVE";
    State3[State3["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    State3[State3["HOLDING"] = 2] = "HOLDING";
    State3[State3["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
  })(State || (State = {}));
  var EVENTS2 = [
    "click",
    "contextmenu",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointerup"
  ];
  var TOUCH_DELAY_MS = 150;
  var FORCED_COLORS = o7 ? null : window.matchMedia("(forced-colors: active)");
  var Ripple = class extends i4 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.hovered = false;
      this.pressed = false;
      this.rippleSize = "";
      this.rippleScale = "";
      this.initialSize = 0;
      this.state = State.INACTIVE;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      const classes = {
        "hovered": this.hovered,
        "pressed": this.pressed
      };
      return x`<div class="surface ${e8(classes)}"></div>`;
    }
    update(changedProps) {
      if (changedProps.has("disabled") && this.disabled) {
        this.hovered = false;
        this.pressed = false;
      }
      super.update(changedProps);
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerenter(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = true;
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerleave(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = false;
      if (this.state !== State.INACTIVE) {
        this.endPressAnimation();
      }
    }
    handlePointerup(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      if (this.state === State.HOLDING) {
        this.state = State.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === State.TOUCH_DELAY) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
    async handlePointerdown(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.rippleStartEvent = event;
      if (!this.isTouch(event)) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(event);
        return;
      }
      this.state = State.TOUCH_DELAY;
      await new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      });
      if (this.state !== State.TOUCH_DELAY) {
        return;
      }
      this.state = State.HOLDING;
      this.startPressAnimation(event);
    }
    handleClick() {
      if (this.disabled) {
        return;
      }
      if (this.state === State.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      if (this.state === State.INACTIVE) {
        this.startPressAnimation();
        this.endPressAnimation();
      }
    }
    handlePointercancel(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.endPressAnimation();
    }
    handleContextmenu() {
      if (this.disabled) {
        return;
      }
      this.endPressAnimation();
    }
    determineRippleSize() {
      const { height, width } = this.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
      const zoom = this.currentCSSZoom ?? 1;
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE / zoom);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;
      this.initialSize = initialSize;
      const maybeZoomedScale = (maxRadius + softEdgeSize) / initialSize;
      this.rippleScale = `${maybeZoomedScale / zoom}`;
      this.rippleSize = `${initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
      const { scrollX, scrollY } = window;
      const { left, top } = this.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = pointerEvent;
      const zoom = this.currentCSSZoom ?? 1;
      return {
        x: (pageX - documentX) / zoom,
        y: (pageY - documentY) / zoom
      };
    }
    getTranslationCoordinates(positionEvent) {
      const { height, width } = this.getBoundingClientRect();
      const zoom = this.currentCSSZoom ?? 1;
      const endPoint = {
        x: (width / zoom - this.initialSize) / 2,
        y: (height / zoom - this.initialSize) / 2
      };
      let startPoint;
      if (positionEvent instanceof PointerEvent) {
        startPoint = this.getNormalizedPointerEventCoords(positionEvent);
      } else {
        startPoint = {
          x: width / zoom / 2,
          y: height / zoom / 2
        };
      }
      startPoint = {
        x: startPoint.x - this.initialSize / 2,
        y: startPoint.y - this.initialSize / 2
      };
      return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
      if (!this.mdRoot) {
        return;
      }
      this.pressed = true;
      this.growAnimation?.cancel();
      this.determineRippleSize();
      const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
      this.growAnimation = this.mdRoot.animate({
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${this.rippleScale})`
        ]
      }, {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL
      });
    }
    async endPressAnimation() {
      this.rippleStartEvent = void 0;
      this.state = State.INACTIVE;
      const animation = this.growAnimation;
      let pressAnimationPlayState = Infinity;
      if (typeof animation?.currentTime === "number") {
        pressAnimationPlayState = animation.currentTime;
      } else if (animation?.currentTime) {
        pressAnimationPlayState = animation.currentTime.to("ms").value;
      }
      if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
        this.pressed = false;
        return;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
      });
      if (this.growAnimation !== animation) {
        return;
      }
      this.pressed = false;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(event) {
      if (this.disabled || !event.isPrimary) {
        return false;
      }
      if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !this.isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return this.isTouch(event) || isPrimaryButton;
    }
    isTouch({ pointerType }) {
      return pointerType === "touch";
    }
    /** @private */
    async handleEvent(event) {
      if (FORCED_COLORS?.matches) {
        return;
      }
      switch (event.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(event);
          break;
        case "pointerdown":
          await this.handlePointerdown(event);
          break;
        case "pointerenter":
          this.handlePointerenter(event);
          break;
        case "pointerleave":
          this.handlePointerleave(event);
          break;
        case "pointerup":
          this.handlePointerup(event);
          break;
        default:
          break;
      }
    }
    onControlChange(prev, next) {
      if (o7)
        return;
      for (const event of EVENTS2) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Ripple.prototype, "disabled", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "hovered", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "pressed", void 0);
  __decorate([
    e4(".surface")
  ], Ripple.prototype, "mdRoot", void 0);

  // node_modules/@material/web/ripple/internal/ripple-styles.js
  var styles4 = i`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

  // node_modules/@material/web/ripple/ripple.js
  var MdRipple = class MdRipple2 extends Ripple {
  };
  MdRipple.styles = [styles4];
  MdRipple = __decorate([
    t("md-ripple")
  ], MdRipple);

  // node_modules/@material/web/labs/behaviors/element-internals.js
  var internals = Symbol("internals");
  var privateInternals = Symbol("privateInternals");
  function mixinElementInternals(base) {
    class WithElementInternalsElement extends base {
      get [internals]() {
        if (!this[privateInternals]) {
          this[privateInternals] = this.attachInternals();
        }
        return this[privateInternals];
      }
    }
    return WithElementInternalsElement;
  }

  // node_modules/@material/web/internal/controller/form-submitter.js
  function setupFormSubmitter(ctor) {
    if (o7) {
      return;
    }
    ctor.addInitializer((instance) => {
      const submitter = instance;
      submitter.addEventListener("click", async (event) => {
        const { type, [internals]: elementInternals } = submitter;
        const { form } = elementInternals;
        if (!form || type === "button") {
          return;
        }
        await new Promise((resolve) => {
          setTimeout(resolve);
        });
        if (event.defaultPrevented) {
          return;
        }
        if (type === "reset") {
          form.reset();
          return;
        }
        form.addEventListener("submit", (submitEvent) => {
          Object.defineProperty(submitEvent, "submitter", {
            configurable: true,
            enumerable: true,
            get: () => submitter
          });
        }, { capture: true, once: true });
        elementInternals.setFormValue(submitter.value);
        form.requestSubmit();
      });
    });
  }

  // node_modules/@material/web/internal/controller/is-rtl.js
  function isRtl(el, shouldCheck = true) {
    return shouldCheck && getComputedStyle(el).getPropertyValue("direction").trim() === "rtl";
  }

  // node_modules/@material/web/iconbutton/internal/icon-button.js
  var iconButtonBaseClass = mixinDelegatesAria(mixinElementInternals(i4));
  var IconButton = class extends iconButtonBaseClass {
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(name) {
      this.setAttribute("name", name);
    }
    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
      return this[internals].form;
    }
    /**
     * The labels this element is associated with.
     */
    get labels() {
      return this[internals].labels;
    }
    constructor() {
      super();
      this.disabled = false;
      this.softDisabled = false;
      this.flipIconInRtl = false;
      this.href = "";
      this.download = "";
      this.target = "";
      this.ariaLabelSelected = "";
      this.toggle = false;
      this.selected = false;
      this.type = "submit";
      this.value = "";
      this.flipIcon = isRtl(this, this.flipIconInRtl);
      if (!o7) {
        this.addEventListener("click", this.handleClick.bind(this));
      }
    }
    willUpdate() {
      if (this.href) {
        this.disabled = false;
        this.softDisabled = false;
      }
    }
    render() {
      const tag = this.href ? i7`div` : i7`button`;
      const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
      const hasToggledAriaLabel = ariaLabel && this.ariaLabelSelected;
      const ariaPressedValue = !this.toggle ? E : this.selected;
      let ariaLabelValue = E;
      if (!this.href) {
        ariaLabelValue = hasToggledAriaLabel && this.selected ? this.ariaLabelSelected : ariaLabel;
      }
      return u4`<${tag}
        class="icon-button ${e8(this.getRenderClasses())}"
        id="button"
        aria-label="${ariaLabelValue || E}"
        aria-haspopup="${!this.href && ariaHasPopup || E}"
        aria-expanded="${!this.href && ariaExpanded || E}"
        aria-pressed="${ariaPressedValue}"
        aria-disabled=${!this.href && this.softDisabled || E}
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${!this.selected ? this.renderIcon() : E}
        ${this.selected ? this.renderSelectedIcon() : E}
        ${this.href ? this.renderLink() : this.renderTouchTarget()}
  </${tag}>`;
    }
    renderLink() {
      const { ariaLabel } = this;
      return x`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download || E}"
        target="${this.target || E}"
        aria-label="${ariaLabel || E}">
        ${this.renderTouchTarget()}
      </a>
    `;
    }
    getRenderClasses() {
      return {
        "flip-icon": this.flipIcon,
        "selected": this.toggle && this.selected
      };
    }
    renderIcon() {
      return x`<span class="icon"><slot></slot></span>`;
    }
    renderSelectedIcon() {
      return x`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`;
    }
    renderTouchTarget() {
      return x`<span class="touch"></span>`;
    }
    renderFocusRing() {
      return x`<md-focus-ring
      part="focus-ring"
      for=${this.href ? "link" : "button"}></md-focus-ring>`;
    }
    renderRipple() {
      const isRippleDisabled = !this.href && (this.disabled || this.softDisabled);
      return x`<md-ripple
      for=${this.href ? "link" : E}
      ?disabled="${isRippleDisabled}"></md-ripple>`;
    }
    connectedCallback() {
      this.flipIcon = isRtl(this, this.flipIconInRtl);
      super.connectedCallback();
    }
    /** Handles a click on this element. */
    handleClick(event) {
      if (!this.href && this.softDisabled) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return;
      }
    }
    /**
     * Handles a click on the child <div> or <button> element within this
     * element's shadow DOM.
     */
    async handleClickOnChild(event) {
      await 0;
      if (!this.toggle || this.disabled || this.softDisabled || event.defaultPrevented) {
        return;
      }
      this.selected = !this.selected;
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };
  (() => {
    setupFormSubmitter(IconButton);
  })();
  IconButton.formAssociated = true;
  IconButton.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], IconButton.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "soft-disabled", reflect: true })
  ], IconButton.prototype, "softDisabled", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "flip-icon-in-rtl" })
  ], IconButton.prototype, "flipIconInRtl", void 0);
  __decorate([
    n3()
  ], IconButton.prototype, "href", void 0);
  __decorate([
    n3()
  ], IconButton.prototype, "download", void 0);
  __decorate([
    n3()
  ], IconButton.prototype, "target", void 0);
  __decorate([
    n3({ attribute: "aria-label-selected" })
  ], IconButton.prototype, "ariaLabelSelected", void 0);
  __decorate([
    n3({ type: Boolean })
  ], IconButton.prototype, "toggle", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], IconButton.prototype, "selected", void 0);
  __decorate([
    n3()
  ], IconButton.prototype, "type", void 0);
  __decorate([
    n3({ reflect: true })
  ], IconButton.prototype, "value", void 0);
  __decorate([
    r4()
  ], IconButton.prototype, "flipIcon", void 0);

  // node_modules/@material/web/iconbutton/internal/shared-styles.js
  var styles5 = i`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;

  // node_modules/@material/web/iconbutton/internal/standard-styles.js
  var styles6 = i`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}
`;

  // node_modules/@material/web/iconbutton/icon-button.js
  var MdIconButton = class MdIconButton2 extends IconButton {
    getRenderClasses() {
      return {
        ...super.getRenderClasses(),
        "standard": true
      };
    }
  };
  MdIconButton.styles = [styles5, styles6];
  MdIconButton = __decorate([
    t("md-icon-button")
  ], MdIconButton);

  // node_modules/@material/web/internal/events/form-label-activation.js
  function dispatchActivationClick(element) {
    const event = new MouseEvent("click", { bubbles: true });
    element.dispatchEvent(event);
    return event;
  }
  function isActivationClick(event) {
    if (event.currentTarget !== event.target) {
      return false;
    }
    if (event.composedPath()[0] !== event.target) {
      return false;
    }
    if (event.target.disabled) {
      return false;
    }
    return !squelchEvent(event);
  }
  function squelchEvent(event) {
    const squelched = isSquelchingEvents;
    if (squelched) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    squelchEventsForMicrotask();
    return squelched;
  }
  var isSquelchingEvents = false;
  async function squelchEventsForMicrotask() {
    isSquelchingEvents = true;
    await null;
    isSquelchingEvents = false;
  }

  // node_modules/@material/web/internal/events/redispatch-event.js
  function redispatchEvent(element, event) {
    if (event.bubbles && (!element.shadowRoot || event.composed)) {
      event.stopPropagation();
    }
    const copy = Reflect.construct(event.constructor, [event.type, event]);
    const dispatched = element.dispatchEvent(copy);
    if (!dispatched) {
      event.preventDefault();
    }
    return dispatched;
  }

  // node_modules/@material/web/labs/behaviors/constraint-validation.js
  var createValidator = Symbol("createValidator");
  var getValidityAnchor = Symbol("getValidityAnchor");
  var privateValidator = Symbol("privateValidator");
  var privateSyncValidity = Symbol("privateSyncValidity");
  var privateCustomValidationMessage = Symbol("privateCustomValidationMessage");
  function mixinConstraintValidation(base) {
    var _a2;
    class ConstraintValidationElement extends base {
      constructor() {
        super(...arguments);
        this[_a2] = "";
      }
      get validity() {
        this[privateSyncValidity]();
        return this[internals].validity;
      }
      get validationMessage() {
        this[privateSyncValidity]();
        return this[internals].validationMessage;
      }
      get willValidate() {
        this[privateSyncValidity]();
        return this[internals].willValidate;
      }
      checkValidity() {
        this[privateSyncValidity]();
        return this[internals].checkValidity();
      }
      reportValidity() {
        this[privateSyncValidity]();
        return this[internals].reportValidity();
      }
      setCustomValidity(error) {
        this[privateCustomValidationMessage] = error;
        this[privateSyncValidity]();
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[privateSyncValidity]();
      }
      firstUpdated(changed) {
        super.firstUpdated(changed);
        this[privateSyncValidity]();
      }
      [(_a2 = privateCustomValidationMessage, privateSyncValidity)]() {
        if (o7) {
          return;
        }
        if (!this[privateValidator]) {
          this[privateValidator] = this[createValidator]();
        }
        const { validity, validationMessage: nonCustomValidationMessage } = this[privateValidator].getValidity();
        const customError = !!this[privateCustomValidationMessage];
        const validationMessage = this[privateCustomValidationMessage] || nonCustomValidationMessage;
        this[internals].setValidity({ ...validity, customError }, validationMessage, this[getValidityAnchor]() ?? void 0);
      }
      [createValidator]() {
        throw new Error("Implement [createValidator]");
      }
      [getValidityAnchor]() {
        throw new Error("Implement [getValidityAnchor]");
      }
    }
    return ConstraintValidationElement;
  }

  // node_modules/@material/web/labs/behaviors/form-associated.js
  var getFormValue = Symbol("getFormValue");
  var getFormState = Symbol("getFormState");
  function mixinFormAssociated(base) {
    class FormAssociatedElement extends base {
      get form() {
        return this[internals].form;
      }
      get labels() {
        return this[internals].labels;
      }
      // Use @property for the `name` and `disabled` properties to add them to the
      // `observedAttributes` array and trigger `attributeChangedCallback()`.
      //
      // We don't use Lit's default getter/setter (`noAccessor: true`) because
      // the attributes need to be updated synchronously to work with synchronous
      // form APIs, and Lit updates attributes async by default.
      get name() {
        return this.getAttribute("name") ?? "";
      }
      set name(name) {
        this.setAttribute("name", name);
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(disabled) {
        this.toggleAttribute("disabled", disabled);
      }
      attributeChangedCallback(name, old, value) {
        if (name === "name" || name === "disabled") {
          const oldValue = name === "disabled" ? old !== null : old;
          this.requestUpdate(name, oldValue);
          return;
        }
        super.attributeChangedCallback(name, old, value);
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[internals].setFormValue(this[getFormValue](), this[getFormState]());
      }
      [getFormValue]() {
        throw new Error("Implement [getFormValue]");
      }
      [getFormState]() {
        return this[getFormValue]();
      }
      formDisabledCallback(disabled) {
        this.disabled = disabled;
      }
    }
    FormAssociatedElement.formAssociated = true;
    __decorate([
      n3({ noAccessor: true })
    ], FormAssociatedElement.prototype, "name", null);
    __decorate([
      n3({ type: Boolean, noAccessor: true })
    ], FormAssociatedElement.prototype, "disabled", null);
    return FormAssociatedElement;
  }

  // node_modules/@material/web/labs/behaviors/validators/validator.js
  var Validator = class {
    /**
     * Creates a new validator.
     *
     * @param getCurrentState A callback that returns the current state of
     *     constraint validation-related properties.
     */
    constructor(getCurrentState) {
      this.getCurrentState = getCurrentState;
      this.currentValidity = {
        validity: {},
        validationMessage: ""
      };
    }
    /**
     * Returns the current `ValidityStateFlags` and validation message for the
     * validator.
     *
     * If the constraint validation state has not changed, this will return a
     * cached result. This is important since `getValidity()` can be called
     * frequently in response to synchronous property changes.
     *
     * @return The current validity and validation message.
     */
    getValidity() {
      const state = this.getCurrentState();
      const hasStateChanged = !this.prevState || !this.equals(this.prevState, state);
      if (!hasStateChanged) {
        return this.currentValidity;
      }
      const { validity, validationMessage } = this.computeValidity(state);
      this.prevState = this.copy(state);
      this.currentValidity = {
        validationMessage,
        validity: {
          // Change any `ValidityState` instances into `ValidityStateFlags` since
          // `ValidityState` cannot be easily `{...spread}`.
          badInput: validity.badInput,
          customError: validity.customError,
          patternMismatch: validity.patternMismatch,
          rangeOverflow: validity.rangeOverflow,
          rangeUnderflow: validity.rangeUnderflow,
          stepMismatch: validity.stepMismatch,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
          typeMismatch: validity.typeMismatch,
          valueMissing: validity.valueMissing
        }
      };
      return this.currentValidity;
    }
  };

  // node_modules/@material/web/labs/behaviors/validators/checkbox-validator.js
  var CheckboxValidator = class extends Validator {
    computeValidity(state) {
      if (!this.checkboxControl) {
        this.checkboxControl = document.createElement("input");
        this.checkboxControl.type = "checkbox";
      }
      this.checkboxControl.checked = state.checked;
      this.checkboxControl.required = state.required;
      return {
        validity: this.checkboxControl.validity,
        validationMessage: this.checkboxControl.validationMessage
      };
    }
    equals(prev, next) {
      return prev.checked === next.checked && prev.required === next.required;
    }
    copy({ checked, required }) {
      return { checked, required };
    }
  };

  // node_modules/@material/web/checkbox/internal/checkbox.js
  var checkboxBaseClass = mixinDelegatesAria(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i4))));
  var Checkbox = class extends checkboxBaseClass {
    constructor() {
      super();
      this.checked = false;
      this.indeterminate = false;
      this.required = false;
      this.value = "on";
      this.prevChecked = false;
      this.prevDisabled = false;
      this.prevIndeterminate = false;
      if (!o7) {
        this.addEventListener("click", (event) => {
          if (!isActivationClick(event) || !this.input) {
            return;
          }
          this.focus();
          dispatchActivationClick(this.input);
        });
      }
    }
    update(changed) {
      if (changed.has("checked") || changed.has("disabled") || changed.has("indeterminate")) {
        this.prevChecked = changed.get("checked") ?? this.checked;
        this.prevDisabled = changed.get("disabled") ?? this.disabled;
        this.prevIndeterminate = changed.get("indeterminate") ?? this.indeterminate;
      }
      super.update(changed);
    }
    render() {
      const prevNone = !this.prevChecked && !this.prevIndeterminate;
      const prevChecked = this.prevChecked && !this.prevIndeterminate;
      const prevIndeterminate = this.prevIndeterminate;
      const isChecked = this.checked && !this.indeterminate;
      const isIndeterminate = this.indeterminate;
      const containerClasses = e8({
        "disabled": this.disabled,
        "selected": isChecked || isIndeterminate,
        "unselected": !isChecked && !isIndeterminate,
        "checked": isChecked,
        "indeterminate": isIndeterminate,
        "prev-unselected": prevNone,
        "prev-checked": prevChecked,
        "prev-indeterminate": prevIndeterminate,
        "prev-disabled": this.prevDisabled
      });
      const { ariaLabel, ariaInvalid } = this;
      return x`
      <div class="container ${containerClasses}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${isIndeterminate ? "mixed" : E}
          aria-label=${ariaLabel || E}
          aria-invalid=${ariaInvalid || E}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `;
    }
    handleInput(event) {
      const target = event.target;
      this.checked = target.checked;
      this.indeterminate = target.indeterminate;
    }
    handleChange(event) {
      redispatchEvent(this, event);
    }
    [getFormValue]() {
      if (!this.checked || this.indeterminate) {
        return null;
      }
      return this.value;
    }
    [getFormState]() {
      return String(this.checked);
    }
    formResetCallback() {
      this.checked = this.hasAttribute("checked");
    }
    formStateRestoreCallback(state) {
      this.checked = state === "true";
    }
    [createValidator]() {
      return new CheckboxValidator(() => this);
    }
    [getValidityAnchor]() {
      return this.input;
    }
  };
  Checkbox.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean })
  ], Checkbox.prototype, "checked", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Checkbox.prototype, "indeterminate", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Checkbox.prototype, "required", void 0);
  __decorate([
    n3()
  ], Checkbox.prototype, "value", void 0);
  __decorate([
    r4()
  ], Checkbox.prototype, "prevChecked", void 0);
  __decorate([
    r4()
  ], Checkbox.prototype, "prevDisabled", void 0);
  __decorate([
    r4()
  ], Checkbox.prototype, "prevIndeterminate", void 0);
  __decorate([
    e4("input")
  ], Checkbox.prototype, "input", void 0);

  // node_modules/@material/web/checkbox/internal/checkbox-styles.js
  var styles7 = i`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;

  // node_modules/@material/web/checkbox/checkbox.js
  var MdCheckbox = class MdCheckbox2 extends Checkbox {
  };
  MdCheckbox.styles = [styles7];
  MdCheckbox = __decorate([
    t("md-checkbox")
  ], MdCheckbox);

  // node_modules/@material/web/menu/internal/menuitem/menu-item-styles.js
  var styles8 = i`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;

  // node_modules/@material/web/labs/item/internal/item.js
  var Item = class extends i4 {
    constructor() {
      super(...arguments);
      this.multiline = false;
    }
    render() {
      return x`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
    }
    handleTextSlotChange() {
      let isMultiline = false;
      let slotsWithContent = 0;
      for (const slot of this.textSlots) {
        if (slotHasContent(slot)) {
          slotsWithContent += 1;
        }
        if (slotsWithContent > 1) {
          isMultiline = true;
          break;
        }
      }
      this.multiline = isMultiline;
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Item.prototype, "multiline", void 0);
  __decorate([
    r5(".text slot")
  ], Item.prototype, "textSlots", void 0);
  function slotHasContent(slot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const isTextWithContent = node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/);
      if (isElement || isTextWithContent) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@material/web/labs/item/internal/item-styles.js
  var styles9 = i`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;

  // node_modules/@material/web/labs/item/item.js
  var MdItem = class MdItem2 extends Item {
  };
  MdItem.styles = [styles9];
  MdItem = __decorate([
    t("md-item")
  ], MdItem);

  // node_modules/@material/web/menu/internal/controllers/shared.js
  function createCloseMenuEvent(initiator, reason) {
    return new CustomEvent("close-menu", {
      bubbles: true,
      composed: true,
      detail: { initiator, reason, itemPath: [initiator] }
    });
  }
  var createDefaultCloseMenuEvent = createCloseMenuEvent;
  var SelectionKey = {
    SPACE: "Space",
    ENTER: "Enter"
  };
  var CloseReason = {
    CLICK_SELECTION: "click-selection",
    KEYDOWN: "keydown"
  };
  var KeydownCloseKey = {
    ESCAPE: "Escape",
    SPACE: SelectionKey.SPACE,
    ENTER: SelectionKey.ENTER
  };
  function isClosableKey(code) {
    return Object.values(KeydownCloseKey).some((value) => value === code);
  }
  function isSelectableKey(code) {
    return Object.values(SelectionKey).some((value) => value === code);
  }
  function isElementInSubtree(target, container) {
    const focusEv = new Event("md-contains", { bubbles: true, composed: true });
    let composedPath = [];
    const listener = (ev) => {
      composedPath = ev.composedPath();
    };
    container.addEventListener("md-contains", listener);
    target.dispatchEvent(focusEv);
    container.removeEventListener("md-contains", listener);
    const isContained = composedPath.length > 0;
    return isContained;
  }
  var FocusState = {
    NONE: "none",
    LIST_ROOT: "list-root",
    FIRST_ITEM: "first-item",
    LAST_ITEM: "last-item"
  };

  // node_modules/@material/web/menu/internal/controllers/menuItemController.js
  var MenuItemController = class {
    /**
     * @param host The MenuItem in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalTypeaheadText = null;
      this.onClick = () => {
        if (this.host.keepOpen)
          return;
        this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
          kind: CloseReason.CLICK_SELECTION
        }));
      };
      this.onKeydown = (event) => {
        if (this.host.href && event.code === "Enter") {
          const interactiveElement = this.getInteractiveElement();
          if (interactiveElement instanceof HTMLAnchorElement) {
            interactiveElement.click();
          }
        }
        if (event.defaultPrevented)
          return;
        const keyCode = event.code;
        if (this.host.keepOpen && keyCode !== "Escape")
          return;
        if (isClosableKey(keyCode)) {
          event.preventDefault();
          this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
            kind: CloseReason.KEYDOWN,
            key: keyCode
          }));
        }
      };
      this.getHeadlineElements = config.getHeadlineElements;
      this.getSupportingTextElements = config.getSupportingTextElements;
      this.getDefaultElements = config.getDefaultElements;
      this.getInteractiveElement = config.getInteractiveElement;
      this.host.addController(this);
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      if (this.internalTypeaheadText !== null) {
        return this.internalTypeaheadText;
      }
      const headlineElements = this.getHeadlineElements();
      const textParts = [];
      headlineElements.forEach((headlineElement) => {
        if (headlineElement.textContent && headlineElement.textContent.trim()) {
          textParts.push(headlineElement.textContent.trim());
        }
      });
      if (textParts.length === 0) {
        this.getDefaultElements().forEach((defaultElement) => {
          if (defaultElement.textContent && defaultElement.textContent.trim()) {
            textParts.push(defaultElement.textContent.trim());
          }
        });
      }
      if (textParts.length === 0) {
        this.getSupportingTextElements().forEach((supportingTextElement) => {
          if (supportingTextElement.textContent && supportingTextElement.textContent.trim()) {
            textParts.push(supportingTextElement.textContent.trim());
          }
        });
      }
      return textParts.join(" ");
    }
    /**
     * The recommended tag name to render as the list item.
     */
    get tagName() {
      const type = this.host.type;
      switch (type) {
        case "link":
          return "a";
        case "button":
          return "button";
        default:
        case "menuitem":
        case "option":
          return "li";
      }
    }
    /**
     * The recommended role of the menu item.
     */
    get role() {
      return this.host.type === "option" ? "option" : "menuitem";
    }
    hostConnected() {
      this.host.toggleAttribute("md-menu-item", true);
    }
    hostUpdate() {
      if (this.host.href) {
        this.host.type = "link";
      }
    }
    /**
     * Use to set the typeaheadText when it changes.
     */
    setTypeaheadText(text) {
      this.internalTypeaheadText = text;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/selectOptionController.js
  function createRequestSelectionEvent() {
    return new Event("request-selection", {
      bubbles: true,
      composed: true
    });
  }
  function createRequestDeselectionEvent() {
    return new Event("request-deselection", {
      bubbles: true,
      composed: true
    });
  }
  var SelectOptionController = class {
    /**
     * The recommended role of the select option.
     */
    get role() {
      return this.menuItemController.role;
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      return this.menuItemController.typeaheadText;
    }
    setTypeaheadText(text) {
      this.menuItemController.setTypeaheadText(text);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot,
     * and if there are no slotted elements into headline, then it checks the
     * _default_ slot, and then the `"supporting-text"` slot if nothing is in
     * _default_.
     */
    get displayText() {
      if (this.internalDisplayText !== null) {
        return this.internalDisplayText;
      }
      return this.menuItemController.typeaheadText;
    }
    setDisplayText(text) {
      this.internalDisplayText = text;
    }
    /**
     * @param host The SelectOption in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalDisplayText = null;
      this.firstUpdate = true;
      this.onClick = () => {
        this.menuItemController.onClick();
      };
      this.onKeydown = (e10) => {
        this.menuItemController.onKeydown(e10);
      };
      this.lastSelected = this.host.selected;
      this.menuItemController = new MenuItemController(host, config);
      host.addController(this);
    }
    hostUpdate() {
      if (this.lastSelected !== this.host.selected) {
        this.host.ariaSelected = this.host.selected ? "true" : "false";
      }
    }
    hostUpdated() {
      if (this.lastSelected !== this.host.selected && !this.firstUpdate) {
        if (this.host.selected) {
          this.host.dispatchEvent(createRequestSelectionEvent());
        } else {
          this.host.dispatchEvent(createRequestDeselectionEvent());
        }
      }
      this.lastSelected = this.host.selected;
      this.firstUpdate = false;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/select-option.js
  var selectOptionBaseClass = mixinDelegatesAria(i4);
  var SelectOptionEl = class extends selectOptionBaseClass {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.isMenuItem = true;
      this.selected = false;
      this.value = "";
      this.type = "option";
      this.selectOptionController = new SelectOptionController(this, {
        getHeadlineElements: () => {
          return this.headlineElements;
        },
        getSupportingTextElements: () => {
          return this.supportingTextElements;
        },
        getDefaultElements: () => {
          return this.defaultElements;
        },
        getInteractiveElement: () => this.listItemRoot
      });
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot.
     */
    get typeaheadText() {
      return this.selectOptionController.typeaheadText;
    }
    set typeaheadText(text) {
      this.selectOptionController.setTypeaheadText(text);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot.
     */
    get displayText() {
      return this.selectOptionController.displayText;
    }
    set displayText(text) {
      this.selectOptionController.setDisplayText(text);
    }
    render() {
      return this.renderListItem(x`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
    }
    /**
     * Renders the root list item.
     *
     * @param content the child content of the list item.
     */
    renderListItem(content) {
      return x`
      <li
        id="item"
        tabindex=${this.disabled ? -1 : 0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel || E}
        aria-selected=${this.ariaSelected || E}
        aria-checked=${this.ariaChecked || E}
        aria-expanded=${this.ariaExpanded || E}
        aria-haspopup=${this.ariaHasPopup || E}
        class="list-item ${e8(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${content}</li
      >
    `;
    }
    /**
     * Handles rendering of the ripple element.
     */
    renderRipple() {
      return x` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
    }
    /**
     * Handles rendering of the focus ring.
     */
    renderFocusRing() {
      return x` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
    }
    /**
     * Classes applied to the list item root.
     */
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "selected": this.selected
      };
    }
    /**
     * Handles rendering the headline and supporting text.
     */
    renderBody() {
      return x`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
    }
    focus() {
      this.listItemRoot?.focus();
    }
  };
  SelectOptionEl.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], SelectOptionEl.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "md-menu-item", reflect: true })
  ], SelectOptionEl.prototype, "isMenuItem", void 0);
  __decorate([
    n3({ type: Boolean })
  ], SelectOptionEl.prototype, "selected", void 0);
  __decorate([
    n3()
  ], SelectOptionEl.prototype, "value", void 0);
  __decorate([
    e4(".list-item")
  ], SelectOptionEl.prototype, "listItemRoot", void 0);
  __decorate([
    o4({ slot: "headline" })
  ], SelectOptionEl.prototype, "headlineElements", void 0);
  __decorate([
    o4({ slot: "supporting-text" })
  ], SelectOptionEl.prototype, "supportingTextElements", void 0);
  __decorate([
    n4({ slot: "" })
  ], SelectOptionEl.prototype, "defaultElements", void 0);
  __decorate([
    n3({ attribute: "typeahead-text" })
  ], SelectOptionEl.prototype, "typeaheadText", null);
  __decorate([
    n3({ attribute: "display-text" })
  ], SelectOptionEl.prototype, "displayText", null);

  // node_modules/@material/web/select/select-option.js
  var MdSelectOption = class MdSelectOption2 extends SelectOptionEl {
  };
  MdSelectOption.styles = [styles8];
  MdSelectOption = __decorate([
    t("md-select-option")
  ], MdSelectOption);

  // node_modules/@material/web/elevation/internal/elevation.js
  var Elevation = class extends i4 {
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      return x`<span class="shadow"></span>`;
    }
  };

  // node_modules/@material/web/elevation/internal/elevation-styles.js
  var styles10 = i`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;

  // node_modules/@material/web/elevation/elevation.js
  var MdElevation = class MdElevation2 extends Elevation {
  };
  MdElevation.styles = [styles10];
  MdElevation = __decorate([
    t("md-elevation")
  ], MdElevation);

  // node_modules/@material/web/button/internal/button.js
  var buttonBaseClass = mixinDelegatesAria(mixinElementInternals(i4));
  var Button = class extends buttonBaseClass {
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(name) {
      this.setAttribute("name", name);
    }
    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
      return this[internals].form;
    }
    constructor() {
      super();
      this.disabled = false;
      this.softDisabled = false;
      this.href = "";
      this.download = "";
      this.target = "";
      this.trailingIcon = false;
      this.hasIcon = false;
      this.type = "submit";
      this.value = "";
      if (!o7) {
        this.addEventListener("click", this.handleClick.bind(this));
      }
    }
    focus() {
      this.buttonElement?.focus();
    }
    blur() {
      this.buttonElement?.blur();
    }
    render() {
      const isRippleDisabled = this.disabled || this.softDisabled;
      const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
      const buttonId = this.href ? "link" : "button";
      return x`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${buttonId}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${buttonId}
        ?disabled="${isRippleDisabled}"></md-ripple>
      ${buttonOrLink}
    `;
    }
    renderButton() {
      const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
      return x`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled || E}
      aria-label="${ariaLabel || E}"
      aria-haspopup="${ariaHasPopup || E}"
      aria-expanded="${ariaExpanded || E}">
      ${this.renderContent()}
    </button>`;
    }
    renderLink() {
      const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
      return x`<a
      id="link"
      class="button"
      aria-label="${ariaLabel || E}"
      aria-haspopup="${ariaHasPopup || E}"
      aria-expanded="${ariaExpanded || E}"
      aria-disabled=${this.disabled || this.softDisabled || E}
      tabindex="${this.disabled && !this.softDisabled ? -1 : E}"
      href=${this.href}
      download=${this.download || E}
      target=${this.target || E}
      >${this.renderContent()}
    </a>`;
    }
    renderContent() {
      const icon = x`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;
      return x`
      <span class="touch"></span>
      ${this.trailingIcon ? E : icon}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon ? icon : E}
    `;
    }
    handleClick(event) {
      if (this.softDisabled || this.disabled && this.href) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return;
      }
      if (!isActivationClick(event) || !this.buttonElement) {
        return;
      }
      this.focus();
      dispatchActivationClick(this.buttonElement);
    }
    handleSlotChange() {
      this.hasIcon = this.assignedIcons.length > 0;
    }
  };
  (() => {
    setupFormSubmitter(Button);
  })();
  Button.formAssociated = true;
  Button.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Button.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "soft-disabled", reflect: true })
  ], Button.prototype, "softDisabled", void 0);
  __decorate([
    n3()
  ], Button.prototype, "href", void 0);
  __decorate([
    n3()
  ], Button.prototype, "download", void 0);
  __decorate([
    n3()
  ], Button.prototype, "target", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "trailing-icon", reflect: true })
  ], Button.prototype, "trailingIcon", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-icon", reflect: true })
  ], Button.prototype, "hasIcon", void 0);
  __decorate([
    n3()
  ], Button.prototype, "type", void 0);
  __decorate([
    n3({ reflect: true })
  ], Button.prototype, "value", void 0);
  __decorate([
    e4(".button")
  ], Button.prototype, "buttonElement", void 0);
  __decorate([
    o4({ slot: "icon", flatten: true })
  ], Button.prototype, "assignedIcons", void 0);

  // node_modules/@material/web/button/internal/filled-button.js
  var FilledButton = class extends Button {
    renderElevationOrOutline() {
      return x`<md-elevation part="elevation"></md-elevation>`;
    }
  };

  // node_modules/@material/web/button/internal/filled-styles.js
  var styles11 = i`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;

  // node_modules/@material/web/button/internal/shared-elevation-styles.js
  var styles12 = i`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;

  // node_modules/@material/web/button/internal/shared-styles.js
  var styles13 = i`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;

  // node_modules/@material/web/button/filled-button.js
  var MdFilledButton = class MdFilledButton2 extends FilledButton {
  };
  MdFilledButton.styles = [
    styles13,
    styles12,
    styles11
  ];
  MdFilledButton = __decorate([
    t("md-filled-button")
  ], MdFilledButton);

  // node_modules/@material/web/button/internal/text-button.js
  var TextButton = class extends Button {
  };

  // node_modules/@material/web/button/internal/text-styles.js
  var styles14 = i`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;

  // node_modules/@material/web/button/text-button.js
  var MdTextButton = class MdTextButton2 extends TextButton {
  };
  MdTextButton.styles = [styles13, styles14];
  MdTextButton = __decorate([
    t("md-text-button")
  ], MdTextButton);

  // node_modules/@material/web/internal/events/dispatch-hooks.js
  var dispatchHooks = Symbol("dispatchHooks");
  function afterDispatch(event, callback) {
    const hooks = event[dispatchHooks];
    if (!hooks) {
      throw new Error(`'${event.type}' event needs setupDispatchHooks().`);
    }
    hooks.addEventListener("after", callback);
  }
  var ELEMENT_DISPATCH_HOOK_TYPES = /* @__PURE__ */ new WeakMap();
  function setupDispatchHooks(element, ...eventTypes) {
    let typesAlreadySetUp = ELEMENT_DISPATCH_HOOK_TYPES.get(element);
    if (!typesAlreadySetUp) {
      typesAlreadySetUp = /* @__PURE__ */ new Set();
      ELEMENT_DISPATCH_HOOK_TYPES.set(element, typesAlreadySetUp);
    }
    for (const eventType of eventTypes) {
      if (typesAlreadySetUp.has(eventType)) {
        continue;
      }
      let isRedispatching = false;
      element.addEventListener(eventType, (event) => {
        if (isRedispatching) {
          return;
        }
        event.stopImmediatePropagation();
        const eventCopy = Reflect.construct(event.constructor, [
          event.type,
          event
        ]);
        const hooks = new EventTarget();
        eventCopy[dispatchHooks] = hooks;
        isRedispatching = true;
        const dispatched = element.dispatchEvent(eventCopy);
        isRedispatching = false;
        if (!dispatched) {
          event.preventDefault();
        }
        hooks.dispatchEvent(new Event("after"));
      }, {
        // Ensure this listener runs before other listeners.
        // `setupDispatchHooks()` should be called in constructors to also
        // ensure they run before any other externally-added capture listeners.
        capture: true
      });
      typesAlreadySetUp.add(eventType);
    }
  }

  // node_modules/@material/web/switch/internal/switch.js
  var switchBaseClass = mixinDelegatesAria(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i4))));
  var Switch = class extends switchBaseClass {
    constructor() {
      super();
      this.selected = false;
      this.icons = false;
      this.showOnlySelectedIcon = false;
      this.required = false;
      this.value = "on";
      if (o7) {
        return;
      }
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event) || !this.input) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.input);
      });
      setupDispatchHooks(this, "keydown");
      this.addEventListener("keydown", (event) => {
        afterDispatch(event, () => {
          const ignoreEvent = event.defaultPrevented || event.key !== "Enter";
          if (ignoreEvent || this.disabled || !this.input) {
            return;
          }
          this.input.click();
        });
      });
    }
    render() {
      return x`
      <div class="switch ${e8(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel || E}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `;
    }
    getRenderClasses() {
      return {
        "selected": this.selected,
        "unselected": !this.selected,
        "disabled": this.disabled
      };
    }
    renderHandle() {
      const classes = {
        "with-icon": this.showOnlySelectedIcon ? this.selected : this.icons
      };
      return x`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${e8(classes)}">
          ${this.shouldShowIcons() ? this.renderIcons() : x``}
        </span>
      </span>
    `;
    }
    renderIcons() {
      return x`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? x`` : this.renderOffIcon()}
      </div>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOnIcon() {
      return x`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOffIcon() {
      return x`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `;
    }
    renderTouchTarget() {
      return x`<span class="touch"></span>`;
    }
    shouldShowIcons() {
      return this.icons || this.showOnlySelectedIcon;
    }
    handleInput(event) {
      const target = event.target;
      this.selected = target.checked;
    }
    handleChange(event) {
      redispatchEvent(this, event);
    }
    [getFormValue]() {
      return this.selected ? this.value : null;
    }
    [getFormState]() {
      return String(this.selected);
    }
    formResetCallback() {
      this.selected = this.hasAttribute("selected");
    }
    formStateRestoreCallback(state) {
      this.selected = state === "true";
    }
    [createValidator]() {
      return new CheckboxValidator(() => ({
        checked: this.selected,
        required: this.required
      }));
    }
    [getValidityAnchor]() {
      return this.input;
    }
  };
  Switch.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean })
  ], Switch.prototype, "selected", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Switch.prototype, "icons", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "show-only-selected-icon" })
  ], Switch.prototype, "showOnlySelectedIcon", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Switch.prototype, "required", void 0);
  __decorate([
    n3()
  ], Switch.prototype, "value", void 0);
  __decorate([
    e4("input")
  ], Switch.prototype, "input", void 0);

  // node_modules/@material/web/switch/internal/switch-styles.js
  var styles15 = i`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:max(100%,var(--md-switch-touch-target-size, 48px));outline:none;margin:0;position:absolute;width:max(100%,var(--md-switch-touch-target-size, 48px));z-index:1;cursor:inherit;top:50%;left:50%;transform:translate(-50%, -50%)}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`;

  // node_modules/@material/web/switch/switch.js
  var MdSwitch = class MdSwitch2 extends Switch {
  };
  MdSwitch.styles = [styles15];
  MdSwitch = __decorate([
    t("md-switch")
  ], MdSwitch);

  // node_modules/@material/web/labs/behaviors/focusable.js
  var isFocusable = Symbol("isFocusable");
  var privateIsFocusable = Symbol("privateIsFocusable");
  var externalTabIndex = Symbol("externalTabIndex");
  var isUpdatingTabIndex = Symbol("isUpdatingTabIndex");
  var updateTabIndex = Symbol("updateTabIndex");
  function mixinFocusable(base) {
    var _a2, _b, _c;
    class FocusableElement extends base {
      constructor() {
        super(...arguments);
        this[_a2] = true;
        this[_b] = null;
        this[_c] = false;
      }
      get [isFocusable]() {
        return this[privateIsFocusable];
      }
      set [isFocusable](value) {
        if (this[isFocusable] === value) {
          return;
        }
        this[privateIsFocusable] = value;
        this[updateTabIndex]();
      }
      connectedCallback() {
        super.connectedCallback();
        this[updateTabIndex]();
      }
      attributeChangedCallback(name, old, value) {
        if (name !== "tabindex") {
          super.attributeChangedCallback(name, old, value);
          return;
        }
        this.requestUpdate("tabIndex", Number(old ?? -1));
        if (this[isUpdatingTabIndex]) {
          return;
        }
        if (!this.hasAttribute("tabindex")) {
          this[externalTabIndex] = null;
          this[updateTabIndex]();
          return;
        }
        this[externalTabIndex] = this.tabIndex;
      }
      [(_a2 = privateIsFocusable, _b = externalTabIndex, _c = isUpdatingTabIndex, updateTabIndex)]() {
        const internalTabIndex = this[isFocusable] ? 0 : -1;
        const computedTabIndex = this[externalTabIndex] ?? internalTabIndex;
        this[isUpdatingTabIndex] = true;
        this.tabIndex = computedTabIndex;
        this[isUpdatingTabIndex] = false;
      }
    }
    __decorate([
      n3({ noAccessor: true })
    ], FocusableElement.prototype, "tabIndex", void 0);
    return FocusableElement;
  }

  // node_modules/@material/web/tabs/internal/tab.js
  var ANIMATE_INDICATOR = Symbol("animateIndicator");
  var tabBaseClass = mixinFocusable(i4);
  var Tab = class extends tabBaseClass {
    /**
     * @deprecated use `active`
     */
    get selected() {
      return this.active;
    }
    set selected(active) {
      this.active = active;
    }
    constructor() {
      super();
      this.isTab = true;
      this.active = false;
      this.hasIcon = false;
      this.iconOnly = false;
      this.fullWidthIndicator = false;
      this.internals = // Cast needed for closure
      this.attachInternals();
      if (!o7) {
        this.internals.role = "tab";
        this.addEventListener("keydown", this.handleKeydown.bind(this));
      }
    }
    render() {
      const indicator = x`<div class="indicator"></div>`;
      return x`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${e8(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator ? E : indicator}
      </div>
      ${this.fullWidthIndicator ? indicator : E}
    </div>`;
    }
    getContentClasses() {
      return {
        "has-icon": this.hasIcon,
        "has-label": !this.iconOnly
      };
    }
    updated() {
      this.internals.ariaSelected = String(this.active);
    }
    async handleKeydown(event) {
      await 0;
      if (event.defaultPrevented) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.click();
      }
    }
    handleContentClick(event) {
      event.stopPropagation();
      this.click();
    }
    [ANIMATE_INDICATOR](previousTab) {
      if (!this.indicator) {
        return;
      }
      this.indicator.getAnimations().forEach((a4) => {
        a4.cancel();
      });
      const frames = this.getKeyframes(previousTab);
      if (frames !== null) {
        this.indicator.animate(frames, {
          duration: 250,
          easing: EASING.EMPHASIZED
        });
      }
    }
    getKeyframes(previousTab) {
      const reduceMotion = shouldReduceMotion();
      if (!this.active) {
        return reduceMotion ? [{ "opacity": 1 }, { "transform": "none" }] : null;
      }
      const from = {};
      const fromRect = previousTab.indicator?.getBoundingClientRect() ?? {};
      const fromPos = fromRect.left;
      const fromExtent = fromRect.width;
      const toRect = this.indicator.getBoundingClientRect();
      const toPos = toRect.left;
      const toExtent = toRect.width;
      const scale = fromExtent / toExtent;
      if (!reduceMotion && fromPos !== void 0 && toPos !== void 0 && !isNaN(scale)) {
        from["transform"] = `translateX(${(fromPos - toPos).toFixed(4)}px) scaleX(${scale.toFixed(4)})`;
      } else {
        from["opacity"] = 0;
      }
      return [from, { "transform": "none" }];
    }
    handleSlotChange() {
      this.iconOnly = false;
      for (const node of this.assignedDefaultNodes) {
        const hasTextContent = node.nodeType === Node.TEXT_NODE && !!node.wholeText.match(/\S/);
        if (node.nodeType === Node.ELEMENT_NODE || hasTextContent) {
          return;
        }
      }
      this.iconOnly = true;
    }
    handleIconSlotChange() {
      this.hasIcon = this.assignedIcons.length > 0;
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true, attribute: "md-tab" })
  ], Tab.prototype, "isTab", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Tab.prototype, "active", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Tab.prototype, "selected", null);
  __decorate([
    n3({ type: Boolean, attribute: "has-icon" })
  ], Tab.prototype, "hasIcon", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "icon-only" })
  ], Tab.prototype, "iconOnly", void 0);
  __decorate([
    e4(".indicator")
  ], Tab.prototype, "indicator", void 0);
  __decorate([
    r4()
  ], Tab.prototype, "fullWidthIndicator", void 0);
  __decorate([
    n4({ flatten: true })
  ], Tab.prototype, "assignedDefaultNodes", void 0);
  __decorate([
    o4({ slot: "icon", flatten: true })
  ], Tab.prototype, "assignedIcons", void 0);
  function shouldReduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // node_modules/@material/web/tabs/internal/primary-tab.js
  var PrimaryTab = class extends Tab {
    constructor() {
      super(...arguments);
      this.inlineIcon = false;
    }
    getContentClasses() {
      return {
        ...super.getContentClasses(),
        "stacked": !this.inlineIcon
      };
    }
  };
  __decorate([
    n3({ type: Boolean, attribute: "inline-icon" })
  ], PrimaryTab.prototype, "inlineIcon", void 0);

  // node_modules/@material/web/tabs/internal/primary-tab-styles.js
  var styles16 = i`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;

  // node_modules/@material/web/tabs/internal/tab-styles.js
  var styles17 = i`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;

  // node_modules/@material/web/tabs/primary-tab.js
  var MdPrimaryTab = class MdPrimaryTab2 extends PrimaryTab {
  };
  MdPrimaryTab.styles = [styles17, styles16];
  MdPrimaryTab = __decorate([
    t("md-primary-tab")
  ], MdPrimaryTab);

  // node_modules/@material/web/divider/internal/divider.js
  var Divider = class extends i4 {
    constructor() {
      super(...arguments);
      this.inset = false;
      this.insetStart = false;
      this.insetEnd = false;
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Divider.prototype, "inset", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true, attribute: "inset-start" })
  ], Divider.prototype, "insetStart", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true, attribute: "inset-end" })
  ], Divider.prototype, "insetEnd", void 0);

  // node_modules/@material/web/divider/internal/divider-styles.js
  var styles18 = i`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;

  // node_modules/@material/web/divider/divider.js
  var MdDivider = class MdDivider2 extends Divider {
  };
  MdDivider.styles = [styles18];
  MdDivider = __decorate([
    t("md-divider")
  ], MdDivider);

  // node_modules/@material/web/tabs/internal/tabs.js
  var Tabs = class extends i4 {
    /**
     * The currently selected tab, `null` only when there are no tab children.
     *
     * @export
     */
    get activeTab() {
      return this.tabs.find((tab) => tab.active) ?? null;
    }
    set activeTab(tab) {
      if (tab) {
        this.activateTab(tab);
      }
    }
    /**
     * The index of the currently selected tab.
     *
     * @export
     */
    get activeTabIndex() {
      return this.tabs.findIndex((tab) => tab.active);
    }
    set activeTabIndex(index) {
      const activateTabAtIndex = () => {
        const tab = this.tabs[index];
        if (tab) {
          this.activateTab(tab);
        }
      };
      if (!this.slotElement) {
        this.updateComplete.then(activateTabAtIndex);
        return;
      }
      activateTabAtIndex();
    }
    get focusedTab() {
      return this.tabs.find((tab) => tab.matches(":focus-within"));
    }
    constructor() {
      super();
      this.autoActivate = false;
      this.internals = // Cast needed for closure
      this.attachInternals();
      if (!o7) {
        this.internals.role = "tablist";
        this.addEventListener("keydown", this.handleKeydown.bind(this));
        this.addEventListener("keyup", this.handleKeyup.bind(this));
        this.addEventListener("focusout", this.handleFocusout.bind(this));
      }
    }
    /**
     * Scrolls the toolbar, if overflowing, to the active tab, or the provided
     * tab.
     *
     * @param tabToScrollTo The tab that should be scrolled to. Defaults to the
     *     active tab.
     * @return A Promise that resolves after the tab has been scrolled to.
     */
    async scrollToTab(tabToScrollTo) {
      await this.updateComplete;
      const { tabs } = this;
      tabToScrollTo ??= this.activeTab;
      if (!tabToScrollTo || !tabs.includes(tabToScrollTo) || !this.tabsScrollerElement) {
        return;
      }
      for (const tab of this.tabs) {
        await tab.updateComplete;
      }
      const offset = tabToScrollTo.offsetLeft;
      const extent = tabToScrollTo.offsetWidth;
      const scroll = this.scrollLeft;
      const hostExtent = this.offsetWidth;
      const scrollMargin = 48;
      const min = offset - scrollMargin;
      const max = offset + extent - hostExtent + scrollMargin;
      const to = Math.min(min, Math.max(max, scroll));
      const behavior = !this.focusedTab ? "instant" : "auto";
      this.tabsScrollerElement.scrollTo({ behavior, top: 0, left: to });
    }
    render() {
      return x`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `;
    }
    async handleTabClick(event) {
      const tab = event.target;
      await 0;
      if (event.defaultPrevented || !isTab(tab) || tab.active) {
        return;
      }
      this.activateTab(tab);
    }
    activateTab(activeTab) {
      const { tabs } = this;
      const previousTab = this.activeTab;
      if (!tabs.includes(activeTab) || previousTab === activeTab) {
        return;
      }
      for (const tab of tabs) {
        tab.active = tab === activeTab;
      }
      if (previousTab) {
        const defaultPrevented = !this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        if (defaultPrevented) {
          for (const tab of tabs) {
            tab.active = tab === previousTab;
          }
          return;
        }
        activeTab[ANIMATE_INDICATOR](previousTab);
      }
      this.updateFocusableTab(activeTab);
      this.scrollToTab(activeTab);
    }
    updateFocusableTab(focusableTab) {
      for (const tab of this.tabs) {
        tab.tabIndex = tab === focusableTab ? 0 : -1;
      }
    }
    // focus item on keydown and optionally select it
    async handleKeydown(event) {
      await 0;
      const isLeft = event.key === "ArrowLeft";
      const isRight = event.key === "ArrowRight";
      const isHome = event.key === "Home";
      const isEnd = event.key === "End";
      if (event.defaultPrevented || !isLeft && !isRight && !isHome && !isEnd) {
        return;
      }
      const { tabs } = this;
      if (tabs.length < 2) {
        return;
      }
      event.preventDefault();
      let indexToFocus;
      if (isHome || isEnd) {
        indexToFocus = isHome ? 0 : tabs.length - 1;
      } else {
        const isRtl2 = getComputedStyle(this).direction === "rtl";
        const forwards = isRtl2 ? isLeft : isRight;
        const { focusedTab } = this;
        if (!focusedTab) {
          indexToFocus = forwards ? 0 : tabs.length - 1;
        } else {
          const focusedIndex = this.tabs.indexOf(focusedTab);
          indexToFocus = forwards ? focusedIndex + 1 : focusedIndex - 1;
          if (indexToFocus >= tabs.length) {
            indexToFocus = 0;
          } else if (indexToFocus < 0) {
            indexToFocus = tabs.length - 1;
          }
        }
      }
      const tabToFocus = tabs[indexToFocus];
      tabToFocus.focus();
      if (this.autoActivate) {
        this.activateTab(tabToFocus);
      } else {
        this.updateFocusableTab(tabToFocus);
      }
    }
    // scroll to item on keyup.
    handleKeyup() {
      this.scrollToTab(this.focusedTab ?? this.activeTab);
    }
    handleFocusout() {
      if (this.matches(":focus-within")) {
        return;
      }
      const { activeTab } = this;
      if (activeTab) {
        this.updateFocusableTab(activeTab);
      }
    }
    handleSlotChange() {
      const firstTab = this.tabs[0];
      if (!this.activeTab && firstTab) {
        this.activateTab(firstTab);
      }
      this.scrollToTab(this.activeTab);
    }
  };
  __decorate([
    o4({ flatten: true, selector: "[md-tab]" })
  ], Tabs.prototype, "tabs", void 0);
  __decorate([
    n3({ type: Number, attribute: "active-tab-index" })
  ], Tabs.prototype, "activeTabIndex", null);
  __decorate([
    n3({ type: Boolean, attribute: "auto-activate" })
  ], Tabs.prototype, "autoActivate", void 0);
  __decorate([
    e4(".tabs")
  ], Tabs.prototype, "tabsScrollerElement", void 0);
  __decorate([
    e4("slot")
  ], Tabs.prototype, "slotElement", void 0);
  function isTab(element) {
    return element instanceof HTMLElement && element.hasAttribute("md-tab");
  }

  // node_modules/@material/web/tabs/internal/tabs-styles.js
  var styles19 = i`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;

  // node_modules/@material/web/tabs/tabs.js
  var MdTabs = class MdTabs2 extends Tabs {
  };
  MdTabs.styles = [styles19];
  MdTabs = __decorate([
    t("md-tabs")
  ], MdTabs);

  // node_modules/@material/web/field/internal/field.js
  var Field = class extends i4 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.error = false;
      this.focused = false;
      this.label = "";
      this.noAsterisk = false;
      this.populated = false;
      this.required = false;
      this.resizable = false;
      this.supportingText = "";
      this.errorText = "";
      this.count = -1;
      this.max = -1;
      this.hasStart = false;
      this.hasEnd = false;
      this.isAnimating = false;
      this.refreshErrorAlert = false;
      this.disableTransitions = false;
    }
    get counterText() {
      const countAsNumber = this.count ?? -1;
      const maxAsNumber = this.max ?? -1;
      if (countAsNumber < 0 || maxAsNumber <= 0) {
        return "";
      }
      return `${countAsNumber} / ${maxAsNumber}`;
    }
    get supportingOrErrorText() {
      return this.error && this.errorText ? this.errorText : this.supportingText;
    }
    /**
     * Re-announces the field's error supporting text to screen readers.
     *
     * Error text announces to screen readers anytime it is visible and changes.
     * Use the method to re-announce the message when the text has not changed,
     * but announcement is still needed (such as for `reportValidity()`).
     */
    reannounceError() {
      this.refreshErrorAlert = true;
    }
    update(props) {
      const isDisabledChanging = props.has("disabled") && props.get("disabled") !== void 0;
      if (isDisabledChanging) {
        this.disableTransitions = true;
      }
      if (this.disabled && this.focused) {
        props.set("focused", true);
        this.focused = false;
      }
      this.animateLabelIfNeeded({
        wasFocused: props.get("focused"),
        wasPopulated: props.get("populated")
      });
      super.update(props);
    }
    render() {
      const floatingLabel = this.renderLabel(
        /*isFloating*/
        true
      );
      const restingLabel = this.renderLabel(
        /*isFloating*/
        false
      );
      const outline = this.renderOutline?.(floatingLabel);
      const classes = {
        "disabled": this.disabled,
        "disable-transitions": this.disableTransitions,
        "error": this.error && !this.disabled,
        "focused": this.focused,
        "with-start": this.hasStart,
        "with-end": this.hasEnd,
        "populated": this.populated,
        "resizable": this.resizable,
        "required": this.required,
        "no-label": !this.label
      };
      return x`
      <div class="field ${e8(classes)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${outline}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${restingLabel} ${outline ? E : floatingLabel}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
    }
    updated(changed) {
      if (changed.has("supportingText") || changed.has("errorText") || changed.has("count") || changed.has("max")) {
        this.updateSlottedAriaDescribedBy();
      }
      if (this.refreshErrorAlert) {
        requestAnimationFrame(() => {
          this.refreshErrorAlert = false;
        });
      }
      if (this.disableTransitions) {
        requestAnimationFrame(() => {
          this.disableTransitions = false;
        });
      }
    }
    renderSupportingText() {
      const { supportingOrErrorText, counterText } = this;
      if (!supportingOrErrorText && !counterText) {
        return E;
      }
      const start = x`<span>${supportingOrErrorText}</span>`;
      const end = counterText ? x`<span class="counter">${counterText}</span>` : E;
      const shouldErrorAnnounce = this.error && this.errorText && !this.refreshErrorAlert;
      const role = shouldErrorAnnounce ? "alert" : E;
      return x`
      <div class="supporting-text" role=${role}>${start}${end}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
    }
    updateSlottedAriaDescribedBy() {
      for (const element of this.slottedAriaDescribedBy) {
        B(x`${this.supportingOrErrorText} ${this.counterText}`, element);
        element.setAttribute("hidden", "");
      }
    }
    renderLabel(isFloating) {
      if (!this.label) {
        return E;
      }
      let visible;
      if (isFloating) {
        visible = this.focused || this.populated || this.isAnimating;
      } else {
        visible = !this.focused && !this.populated && !this.isAnimating;
      }
      const classes = {
        "hidden": !visible,
        "floating": isFloating,
        "resting": !isFloating
      };
      const labelText = `${this.label}${this.required && !this.noAsterisk ? "*" : ""}`;
      return x`
      <span class="label ${e8(classes)}" aria-hidden=${!visible}
        >${labelText}</span
      >
    `;
    }
    animateLabelIfNeeded({ wasFocused, wasPopulated }) {
      if (!this.label) {
        return;
      }
      wasFocused ??= this.focused;
      wasPopulated ??= this.populated;
      const wasFloating = wasFocused || wasPopulated;
      const shouldBeFloating = this.focused || this.populated;
      if (wasFloating === shouldBeFloating) {
        return;
      }
      this.isAnimating = true;
      this.labelAnimation?.cancel();
      this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
      this.labelAnimation?.addEventListener("finish", () => {
        this.isAnimating = false;
      });
    }
    getLabelKeyframes() {
      const { floatingLabelEl, restingLabelEl } = this;
      if (!floatingLabelEl || !restingLabelEl) {
        return [];
      }
      const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
      const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
      const floatingScrollWidth = floatingLabelEl.scrollWidth;
      const restingScrollWidth = restingLabelEl.scrollWidth;
      const scale = restingScrollWidth / floatingScrollWidth;
      const xDelta = restingX - floatingX;
      const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
      const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
      const floatTransform = `translateX(0) translateY(0) scale(1)`;
      const restingClientWidth = restingLabelEl.clientWidth;
      const isRestingClipped = restingScrollWidth > restingClientWidth;
      const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
      if (this.focused || this.populated) {
        return [
          { transform: restTransform, width },
          { transform: floatTransform, width }
        ];
      }
      return [
        { transform: floatTransform, width },
        { transform: restTransform, width }
      ];
    }
    getSurfacePositionClientRect() {
      return this.containerEl.getBoundingClientRect();
    }
  };
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "error", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "focused", void 0);
  __decorate([
    n3()
  ], Field.prototype, "label", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-asterisk" })
  ], Field.prototype, "noAsterisk", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "populated", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "required", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "resizable", void 0);
  __decorate([
    n3({ attribute: "supporting-text" })
  ], Field.prototype, "supportingText", void 0);
  __decorate([
    n3({ attribute: "error-text" })
  ], Field.prototype, "errorText", void 0);
  __decorate([
    n3({ type: Number })
  ], Field.prototype, "count", void 0);
  __decorate([
    n3({ type: Number })
  ], Field.prototype, "max", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-start" })
  ], Field.prototype, "hasStart", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-end" })
  ], Field.prototype, "hasEnd", void 0);
  __decorate([
    o4({ slot: "aria-describedby" })
  ], Field.prototype, "slottedAriaDescribedBy", void 0);
  __decorate([
    r4()
  ], Field.prototype, "isAnimating", void 0);
  __decorate([
    r4()
  ], Field.prototype, "refreshErrorAlert", void 0);
  __decorate([
    r4()
  ], Field.prototype, "disableTransitions", void 0);
  __decorate([
    e4(".label.floating")
  ], Field.prototype, "floatingLabelEl", void 0);
  __decorate([
    e4(".label.resting")
  ], Field.prototype, "restingLabelEl", void 0);
  __decorate([
    e4(".container")
  ], Field.prototype, "containerEl", void 0);

  // node_modules/@material/web/field/internal/filled-field.js
  var FilledField = class extends Field {
    renderBackground() {
      return x` <div class="background"></div> `;
    }
    renderStateLayer() {
      return x` <div class="state-layer"></div> `;
    }
    renderIndicator() {
      return x`<div class="active-indicator"></div>`;
    }
  };

  // node_modules/@material/web/field/internal/filled-styles.js
  var styles20 = i`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;

  // node_modules/@material/web/field/internal/shared-styles.js
  var styles21 = i`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;

  // node_modules/@material/web/field/filled-field.js
  var MdFilledField = class MdFilledField2 extends FilledField {
  };
  MdFilledField.styles = [styles21, styles20];
  MdFilledField = __decorate([
    t("md-filled-field")
  ], MdFilledField);

  // node_modules/@material/web/textfield/internal/filled-styles.js
  var styles22 = i`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;

  // node_modules/lit-html/directives/live.js
  var l6 = e7(class extends i5 {
    constructor(r11) {
      if (super(r11), r11.type !== t4.PROPERTY && r11.type !== t4.ATTRIBUTE && r11.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
      if (!f3(r11)) throw Error("`live` bindings can only contain a single expression");
    }
    render(r11) {
      return r11;
    }
    update(i9, [t6]) {
      if (t6 === T || t6 === E) return t6;
      const o13 = i9.element, l7 = i9.name;
      if (i9.type === t4.PROPERTY) {
        if (t6 === o13[l7]) return T;
      } else if (i9.type === t4.BOOLEAN_ATTRIBUTE) {
        if (!!t6 === o13.hasAttribute(l7)) return T;
      } else if (i9.type === t4.ATTRIBUTE && o13.getAttribute(l7) === t6 + "") return T;
      return m2(i9), t6;
    }
  });

  // node_modules/lit-html/directives/style-map.js
  var n8 = "important";
  var i8 = " !" + n8;
  var o12 = e7(class extends i5 {
    constructor(t6) {
      if (super(t6), t6.type !== t4.ATTRIBUTE || "style" !== t6.name || t6.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t6) {
      return Object.keys(t6).reduce((e10, r11) => {
        const s6 = t6[r11];
        return null == s6 ? e10 : e10 + `${r11 = r11.includes("-") ? r11 : r11.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s6};`;
      }, "");
    }
    update(e10, [r11]) {
      const { style: s6 } = e10.element;
      if (void 0 === this.ft) return this.ft = new Set(Object.keys(r11)), this.render(r11);
      for (const t6 of this.ft) null == r11[t6] && (this.ft.delete(t6), t6.includes("-") ? s6.removeProperty(t6) : s6[t6] = null);
      for (const t6 in r11) {
        const e11 = r11[t6];
        if (null != e11) {
          this.ft.add(t6);
          const r12 = "string" == typeof e11 && e11.endsWith(i8);
          t6.includes("-") || r12 ? s6.setProperty(t6, r12 ? e11.slice(0, -11) : e11, r12 ? n8 : "") : s6[t6] = e11;
        }
      }
      return T;
    }
  });

  // node_modules/@material/web/internal/controller/string-converter.js
  var stringConverter = {
    fromAttribute(value) {
      return value ?? "";
    },
    toAttribute(value) {
      return value || null;
    }
  };

  // node_modules/@material/web/labs/behaviors/on-report-validity.js
  var onReportValidity = Symbol("onReportValidity");
  var privateCleanupFormListeners = Symbol("privateCleanupFormListeners");
  var privateDoNotReportInvalid = Symbol("privateDoNotReportInvalid");
  var privateIsSelfReportingValidity = Symbol("privateIsSelfReportingValidity");
  var privateCallOnReportValidity = Symbol("privateCallOnReportValidity");
  function mixinOnReportValidity(base) {
    var _a2, _b, _c;
    class OnReportValidityElement extends base {
      // Mixins must have a constructor with `...args: any[]`
      // tslint:disable-next-line:no-any
      constructor(...args) {
        super(...args);
        this[_a2] = new AbortController();
        this[_b] = false;
        this[_c] = false;
        if (o7) {
          return;
        }
        this.addEventListener("invalid", (invalidEvent) => {
          if (this[privateDoNotReportInvalid] || !invalidEvent.isTrusted) {
            return;
          }
          this.addEventListener("invalid", () => {
            this[privateCallOnReportValidity](invalidEvent);
          }, { once: true });
        }, {
          // Listen during the capture phase, which will happen before the
          // bubbling phase. That way, we can add a final event listener that
          // will run after other event listeners, and we can check if it was
          // default prevented. This works because invalid does not bubble.
          capture: true
        });
      }
      checkValidity() {
        this[privateDoNotReportInvalid] = true;
        const valid = super.checkValidity();
        this[privateDoNotReportInvalid] = false;
        return valid;
      }
      reportValidity() {
        this[privateIsSelfReportingValidity] = true;
        const valid = super.reportValidity();
        if (valid) {
          this[privateCallOnReportValidity](null);
        }
        this[privateIsSelfReportingValidity] = false;
        return valid;
      }
      [(_a2 = privateCleanupFormListeners, _b = privateDoNotReportInvalid, _c = privateIsSelfReportingValidity, privateCallOnReportValidity)](invalidEvent) {
        const wasCanceled = invalidEvent?.defaultPrevented;
        if (wasCanceled) {
          return;
        }
        this[onReportValidity](invalidEvent);
        const implementationCanceledFocus = !wasCanceled && invalidEvent?.defaultPrevented;
        if (!implementationCanceledFocus) {
          return;
        }
        if (this[privateIsSelfReportingValidity] || isFirstInvalidControlInForm(this[internals].form, this)) {
          this.focus();
        }
      }
      [onReportValidity](invalidEvent) {
        throw new Error("Implement [onReportValidity]");
      }
      formAssociatedCallback(form) {
        if (super.formAssociatedCallback) {
          super.formAssociatedCallback(form);
        }
        this[privateCleanupFormListeners].abort();
        if (!form) {
          return;
        }
        this[privateCleanupFormListeners] = new AbortController();
        addFormReportValidListener(this, form, () => {
          this[privateCallOnReportValidity](null);
        }, this[privateCleanupFormListeners].signal);
      }
    }
    return OnReportValidityElement;
  }
  function addFormReportValidListener(control, form, onControlValid, cleanup) {
    const validateHooks = getFormValidateHooks(form);
    let controlFiredInvalid = false;
    let cleanupInvalidListener;
    let isNextSubmitFromHook = false;
    validateHooks.addEventListener("before", () => {
      isNextSubmitFromHook = true;
      cleanupInvalidListener = new AbortController();
      controlFiredInvalid = false;
      control.addEventListener("invalid", () => {
        controlFiredInvalid = true;
      }, {
        signal: cleanupInvalidListener.signal
      });
    }, { signal: cleanup });
    validateHooks.addEventListener("after", () => {
      isNextSubmitFromHook = false;
      cleanupInvalidListener?.abort();
      if (controlFiredInvalid) {
        return;
      }
      onControlValid();
    }, { signal: cleanup });
    form.addEventListener("submit", () => {
      if (isNextSubmitFromHook) {
        return;
      }
      onControlValid();
    }, {
      signal: cleanup
    });
  }
  var FORM_VALIDATE_HOOKS = /* @__PURE__ */ new WeakMap();
  function getFormValidateHooks(form) {
    if (!FORM_VALIDATE_HOOKS.has(form)) {
      const hooks = new EventTarget();
      FORM_VALIDATE_HOOKS.set(form, hooks);
      for (const methodName of ["reportValidity", "requestSubmit"]) {
        const superMethod = form[methodName];
        form[methodName] = function() {
          hooks.dispatchEvent(new Event("before"));
          const result = Reflect.apply(superMethod, this, arguments);
          hooks.dispatchEvent(new Event("after"));
          return result;
        };
      }
    }
    return FORM_VALIDATE_HOOKS.get(form);
  }
  function isFirstInvalidControlInForm(form, control) {
    if (!form) {
      return true;
    }
    let firstInvalidControl;
    for (const element of form.elements) {
      if (element.matches(":invalid")) {
        firstInvalidControl = element;
        break;
      }
    }
    return firstInvalidControl === control;
  }

  // node_modules/@material/web/labs/behaviors/validators/text-field-validator.js
  var TextFieldValidator = class extends Validator {
    computeValidity({ state, renderedControl }) {
      let inputOrTextArea = renderedControl;
      if (isInputState(state) && !inputOrTextArea) {
        inputOrTextArea = this.inputControl || document.createElement("input");
        this.inputControl = inputOrTextArea;
      } else if (!inputOrTextArea) {
        inputOrTextArea = this.textAreaControl || document.createElement("textarea");
        this.textAreaControl = inputOrTextArea;
      }
      const input = isInputState(state) ? inputOrTextArea : null;
      if (input) {
        input.type = state.type;
      }
      if (inputOrTextArea.value !== state.value) {
        inputOrTextArea.value = state.value;
      }
      inputOrTextArea.required = state.required;
      if (input) {
        const inputState = state;
        if (inputState.pattern) {
          input.pattern = inputState.pattern;
        } else {
          input.removeAttribute("pattern");
        }
        if (inputState.min) {
          input.min = inputState.min;
        } else {
          input.removeAttribute("min");
        }
        if (inputState.max) {
          input.max = inputState.max;
        } else {
          input.removeAttribute("max");
        }
        if (inputState.step) {
          input.step = inputState.step;
        } else {
          input.removeAttribute("step");
        }
      }
      if ((state.minLength ?? -1) > -1) {
        inputOrTextArea.setAttribute("minlength", String(state.minLength));
      } else {
        inputOrTextArea.removeAttribute("minlength");
      }
      if ((state.maxLength ?? -1) > -1) {
        inputOrTextArea.setAttribute("maxlength", String(state.maxLength));
      } else {
        inputOrTextArea.removeAttribute("maxlength");
      }
      return {
        validity: inputOrTextArea.validity,
        validationMessage: inputOrTextArea.validationMessage
      };
    }
    equals({ state: prev }, { state: next }) {
      const inputOrTextAreaEqual = prev.type === next.type && prev.value === next.value && prev.required === next.required && prev.minLength === next.minLength && prev.maxLength === next.maxLength;
      if (!isInputState(prev) || !isInputState(next)) {
        return inputOrTextAreaEqual;
      }
      return inputOrTextAreaEqual && prev.pattern === next.pattern && prev.min === next.min && prev.max === next.max && prev.step === next.step;
    }
    copy({ state }) {
      return {
        state: isInputState(state) ? this.copyInput(state) : this.copyTextArea(state),
        renderedControl: null
      };
    }
    copyInput(state) {
      const { type, pattern, min, max, step } = state;
      return {
        ...this.copySharedState(state),
        type,
        pattern,
        min,
        max,
        step
      };
    }
    copyTextArea(state) {
      return {
        ...this.copySharedState(state),
        type: state.type
      };
    }
    copySharedState({ value, required, minLength, maxLength }) {
      return { value, required, minLength, maxLength };
    }
  };
  function isInputState(state) {
    return state.type !== "textarea";
  }

  // node_modules/@material/web/textfield/internal/text-field.js
  var textFieldBaseClass = mixinDelegatesAria(mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i4)))));
  var TextField = class extends textFieldBaseClass {
    constructor() {
      super(...arguments);
      this.error = false;
      this.errorText = "";
      this.label = "";
      this.noAsterisk = false;
      this.required = false;
      this.value = "";
      this.prefixText = "";
      this.suffixText = "";
      this.hasLeadingIcon = false;
      this.hasTrailingIcon = false;
      this.supportingText = "";
      this.textDirection = "";
      this.rows = 2;
      this.cols = 20;
      this.inputMode = "";
      this.max = "";
      this.maxLength = -1;
      this.min = "";
      this.minLength = -1;
      this.noSpinner = false;
      this.pattern = "";
      this.placeholder = "";
      this.readOnly = false;
      this.multiple = false;
      this.step = "";
      this.type = "text";
      this.autocomplete = "";
      this.dirty = false;
      this.focused = false;
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    /**
     * Gets or sets the direction in which selection occurred.
     */
    get selectionDirection() {
      return this.getInputOrTextarea().selectionDirection;
    }
    set selectionDirection(value) {
      this.getInputOrTextarea().selectionDirection = value;
    }
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    get selectionEnd() {
      return this.getInputOrTextarea().selectionEnd;
    }
    set selectionEnd(value) {
      this.getInputOrTextarea().selectionEnd = value;
    }
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    get selectionStart() {
      return this.getInputOrTextarea().selectionStart;
    }
    set selectionStart(value) {
      this.getInputOrTextarea().selectionStart = value;
    }
    /**
     * The text field's value as a number.
     */
    get valueAsNumber() {
      const input = this.getInput();
      if (!input) {
        return NaN;
      }
      return input.valueAsNumber;
    }
    set valueAsNumber(value) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.valueAsNumber = value;
      this.value = input.value;
    }
    /**
     * The text field's value as a Date.
     */
    get valueAsDate() {
      const input = this.getInput();
      if (!input) {
        return null;
      }
      return input.valueAsDate;
    }
    set valueAsDate(value) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.valueAsDate = value;
      this.value = input.value;
    }
    get hasError() {
      return this.error || this.nativeError;
    }
    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select() {
      this.getInputOrTextarea().select();
    }
    setRangeText(...args) {
      this.getInputOrTextarea().setRangeText(...args);
      this.value = this.getInputOrTextarea().value;
    }
    /**
     * Sets the start and end positions of a selection in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     *
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start, end, direction) {
      this.getInputOrTextarea().setSelectionRange(start, end, direction);
    }
    /**
     * Shows the browser picker for an input element of type "date", "time", etc.
     *
     * For a full list of supported types, see:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker#browser_compatibility
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
     */
    showPicker() {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.showPicker();
    }
    /**
     * Decrements the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
     *
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.stepDown(stepDecrement);
      this.value = input.value;
    }
    /**
     * Increments the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
     *
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.stepUp(stepIncrement);
      this.value = input.value;
    }
    /**
     * Reset the text field to its default value.
     */
    reset() {
      this.dirty = false;
      this.value = this.getAttribute("value") ?? "";
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    attributeChangedCallback(attribute, newValue, oldValue) {
      if (attribute === "value" && this.dirty) {
        return;
      }
      super.attributeChangedCallback(attribute, newValue, oldValue);
    }
    render() {
      const classes = {
        "disabled": this.disabled,
        "error": !this.disabled && this.hasError,
        "textarea": this.type === "textarea",
        "no-spinner": this.noSpinner
      };
      return x`
      <span class="text-field ${e8(classes)}">
        ${this.renderField()}
      </span>
    `;
    }
    updated(changedProperties) {
      const value = this.getInputOrTextarea().value;
      if (this.value !== value) {
        this.value = value;
      }
    }
    renderField() {
      return u4`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type === "textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`;
    }
    renderLeadingIcon() {
      return x`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderTrailingIcon() {
      return x`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderInputOrTextarea() {
      const style = { "direction": this.textDirection };
      const ariaLabel = this.ariaLabel || this.label || E;
      const autocomplete = this.autocomplete;
      const hasMaxLength = (this.maxLength ?? -1) > -1;
      const hasMinLength = (this.minLength ?? -1) > -1;
      if (this.type === "textarea") {
        return x`
        <textarea
          class="input"
          style=${o12(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || E}
          name=${this.name || E}
          ?disabled=${this.disabled}
          maxlength=${hasMaxLength ? this.maxLength : E}
          minlength=${hasMinLength ? this.minLength : E}
          placeholder=${this.placeholder || E}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${l6(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
      }
      const prefix = this.renderPrefix();
      const suffix = this.renderSuffix();
      const inputMode = this.inputMode;
      return x`
      <div class="input-wrapper">
        ${prefix}
        <input
          class="input"
          style=${o12(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || E}
          name=${this.name || E}
          ?disabled=${this.disabled}
          inputmode=${inputMode || E}
          max=${this.max || E}
          maxlength=${hasMaxLength ? this.maxLength : E}
          min=${this.min || E}
          minlength=${hasMinLength ? this.minLength : E}
          pattern=${this.pattern || E}
          placeholder=${this.placeholder || E}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step || E}
          type=${this.type}
          .value=${l6(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${suffix}
      </div>
    `;
    }
    renderPrefix() {
      return this.renderAffix(
        this.prefixText,
        /* isSuffix */
        false
      );
    }
    renderSuffix() {
      return this.renderAffix(
        this.suffixText,
        /* isSuffix */
        true
      );
    }
    renderAffix(text, isSuffix) {
      if (!text) {
        return E;
      }
      const classes = {
        "suffix": isSuffix,
        "prefix": !isSuffix
      };
      return x`<span class="${e8(classes)}">${text}</span>`;
    }
    getErrorText() {
      return this.error ? this.errorText : this.nativeErrorText;
    }
    handleFocusChange() {
      this.focused = this.inputOrTextarea?.matches(":focus") ?? false;
    }
    handleInput(event) {
      this.dirty = true;
      this.value = event.target.value;
    }
    redispatchEvent(event) {
      redispatchEvent(this, event);
    }
    getInputOrTextarea() {
      if (!this.inputOrTextarea) {
        this.connectedCallback();
        this.scheduleUpdate();
      }
      if (this.isUpdatePending) {
        this.scheduleUpdate();
      }
      return this.inputOrTextarea;
    }
    getInput() {
      if (this.type === "textarea") {
        return null;
      }
      return this.getInputOrTextarea();
    }
    handleIconChange() {
      this.hasLeadingIcon = this.leadingIcons.length > 0;
      this.hasTrailingIcon = this.trailingIcons.length > 0;
    }
    [getFormValue]() {
      return this.value;
    }
    formResetCallback() {
      this.reset();
    }
    formStateRestoreCallback(state) {
      this.value = state;
    }
    focus() {
      this.getInputOrTextarea().focus();
    }
    [createValidator]() {
      return new TextFieldValidator(() => ({
        state: this,
        renderedControl: this.inputOrTextarea
      }));
    }
    [getValidityAnchor]() {
      return this.inputOrTextarea;
    }
    [onReportValidity](invalidEvent) {
      invalidEvent?.preventDefault();
      const prevMessage = this.getErrorText();
      this.nativeError = !!invalidEvent;
      this.nativeErrorText = this.validationMessage;
      if (prevMessage === this.getErrorText()) {
        this.field?.reannounceError();
      }
    }
  };
  TextField.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], TextField.prototype, "error", void 0);
  __decorate([
    n3({ attribute: "error-text" })
  ], TextField.prototype, "errorText", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "label", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-asterisk" })
  ], TextField.prototype, "noAsterisk", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], TextField.prototype, "required", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "value", void 0);
  __decorate([
    n3({ attribute: "prefix-text" })
  ], TextField.prototype, "prefixText", void 0);
  __decorate([
    n3({ attribute: "suffix-text" })
  ], TextField.prototype, "suffixText", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-leading-icon" })
  ], TextField.prototype, "hasLeadingIcon", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-trailing-icon" })
  ], TextField.prototype, "hasTrailingIcon", void 0);
  __decorate([
    n3({ attribute: "supporting-text" })
  ], TextField.prototype, "supportingText", void 0);
  __decorate([
    n3({ attribute: "text-direction" })
  ], TextField.prototype, "textDirection", void 0);
  __decorate([
    n3({ type: Number })
  ], TextField.prototype, "rows", void 0);
  __decorate([
    n3({ type: Number })
  ], TextField.prototype, "cols", void 0);
  __decorate([
    n3({ reflect: true })
  ], TextField.prototype, "inputMode", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "max", void 0);
  __decorate([
    n3({ type: Number })
  ], TextField.prototype, "maxLength", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "min", void 0);
  __decorate([
    n3({ type: Number })
  ], TextField.prototype, "minLength", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-spinner" })
  ], TextField.prototype, "noSpinner", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "pattern", void 0);
  __decorate([
    n3({ reflect: true, converter: stringConverter })
  ], TextField.prototype, "placeholder", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], TextField.prototype, "readOnly", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], TextField.prototype, "multiple", void 0);
  __decorate([
    n3()
  ], TextField.prototype, "step", void 0);
  __decorate([
    n3({ reflect: true })
  ], TextField.prototype, "type", void 0);
  __decorate([
    n3({ reflect: true })
  ], TextField.prototype, "autocomplete", void 0);
  __decorate([
    r4()
  ], TextField.prototype, "dirty", void 0);
  __decorate([
    r4()
  ], TextField.prototype, "focused", void 0);
  __decorate([
    r4()
  ], TextField.prototype, "nativeError", void 0);
  __decorate([
    r4()
  ], TextField.prototype, "nativeErrorText", void 0);
  __decorate([
    e4(".input")
  ], TextField.prototype, "inputOrTextarea", void 0);
  __decorate([
    e4(".field")
  ], TextField.prototype, "field", void 0);
  __decorate([
    o4({ slot: "leading-icon" })
  ], TextField.prototype, "leadingIcons", void 0);
  __decorate([
    o4({ slot: "trailing-icon" })
  ], TextField.prototype, "trailingIcons", void 0);

  // node_modules/@material/web/textfield/internal/filled-text-field.js
  var FilledTextField = class extends TextField {
    constructor() {
      super(...arguments);
      this.fieldTag = i7`md-filled-field`;
    }
  };

  // node_modules/@material/web/textfield/internal/shared-styles.js
  var styles23 = i`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;

  // node_modules/@material/web/textfield/filled-text-field.js
  var MdFilledTextField = class MdFilledTextField2 extends FilledTextField {
    constructor() {
      super(...arguments);
      this.fieldTag = i7`md-filled-field`;
    }
  };
  MdFilledTextField.styles = [styles23, styles22];
  MdFilledTextField = __decorate([
    t("md-filled-text-field")
  ], MdFilledTextField);

  // node_modules/@material/web/field/internal/outlined-field.js
  var OutlinedField = class extends Field {
    renderOutline(floatingLabel) {
      return x`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${floatingLabel}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
    }
  };

  // node_modules/@material/web/field/internal/outlined-styles.js
  var styles24 = i`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;

  // node_modules/@material/web/field/outlined-field.js
  var MdOutlinedField = class MdOutlinedField2 extends OutlinedField {
  };
  MdOutlinedField.styles = [styles21, styles24];
  MdOutlinedField = __decorate([
    t("md-outlined-field")
  ], MdOutlinedField);

  // node_modules/@material/web/list/internal/list-navigation-helpers.js
  function activateFirstItem(items, isActivatable = isItemNotDisabled) {
    const firstItem = getFirstActivatableItem(items, isActivatable);
    if (firstItem) {
      firstItem.tabIndex = 0;
      firstItem.focus();
    }
    return firstItem;
  }
  function activateLastItem(items, isActivatable = isItemNotDisabled) {
    const lastItem = getLastActivatableItem(items, isActivatable);
    if (lastItem) {
      lastItem.tabIndex = 0;
      lastItem.focus();
    }
    return lastItem;
  }
  function getActiveItem(items, isActivatable = isItemNotDisabled) {
    for (let i9 = 0; i9 < items.length; i9++) {
      const item = items[i9];
      if (item.tabIndex === 0 && isActivatable(item)) {
        return {
          item,
          index: i9
        };
      }
    }
    return null;
  }
  function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (const item of items) {
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (let i9 = items.length - 1; i9 >= 0; i9--) {
      const item = items[i9];
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getNextItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i9 = 1; i9 < items.length; i9++) {
      const nextIndex = (i9 + index) % items.length;
      if (nextIndex < index && !wrap) {
        return null;
      }
      const item = items[nextIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function getPrevItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i9 = 1; i9 < items.length; i9++) {
      const prevIndex = (index - i9 + items.length) % items.length;
      if (prevIndex > index && !wrap) {
        return null;
      }
      const item = items[prevIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function activateNextItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const next = getNextItem(items, activeItemRecord.index, isActivatable, wrap);
      if (next) {
        next.tabIndex = 0;
        next.focus();
      }
      return next;
    } else {
      return activateFirstItem(items, isActivatable);
    }
  }
  function activatePreviousItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const prev = getPrevItem(items, activeItemRecord.index, isActivatable, wrap);
      if (prev) {
        prev.tabIndex = 0;
        prev.focus();
      }
      return prev;
    } else {
      return activateLastItem(items, isActivatable);
    }
  }
  function isItemNotDisabled(item) {
    return !item.disabled;
  }

  // node_modules/@material/web/list/internal/list-controller.js
  var NavigableKeys = {
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Home: "Home",
    End: "End"
  };
  var ListController = class {
    constructor(config) {
      this.handleKeydown = (event) => {
        const key = event.key;
        if (event.defaultPrevented || !this.isNavigableKey(key)) {
          return;
        }
        const items = this.items;
        if (!items.length) {
          return;
        }
        const activeItemRecord = getActiveItem(items, this.isActivatable);
        event.preventDefault();
        const isRtl3 = this.isRtl();
        const inlinePrevious = isRtl3 ? NavigableKeys.ArrowRight : NavigableKeys.ArrowLeft;
        const inlineNext = isRtl3 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
        let nextActiveItem = null;
        switch (key) {
          // Activate the next item
          case NavigableKeys.ArrowDown:
          case inlineNext:
            nextActiveItem = activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          // Activate the previous item
          case NavigableKeys.ArrowUp:
          case inlinePrevious:
            nextActiveItem = activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          // Activate the first item
          case NavigableKeys.Home:
            nextActiveItem = activateFirstItem(items, this.isActivatable);
            break;
          // Activate the last item
          case NavigableKeys.End:
            nextActiveItem = activateLastItem(items, this.isActivatable);
            break;
          default:
            break;
        }
        if (nextActiveItem && activeItemRecord && activeItemRecord.item !== nextActiveItem) {
          activeItemRecord.item.tabIndex = -1;
        }
      };
      this.onDeactivateItems = () => {
        const items = this.items;
        for (const item of items) {
          this.deactivateItem(item);
        }
      };
      this.onRequestActivation = (event) => {
        this.onDeactivateItems();
        const target = event.target;
        this.activateItem(target);
        target.focus();
      };
      this.onSlotchange = () => {
        const items = this.items;
        let encounteredActivated = false;
        for (const item of items) {
          const isActivated = !item.disabled && item.tabIndex > -1;
          if (isActivated && !encounteredActivated) {
            encounteredActivated = true;
            item.tabIndex = 0;
            continue;
          }
          item.tabIndex = -1;
        }
        if (encounteredActivated) {
          return;
        }
        const firstActivatableItem = getFirstActivatableItem(items, this.isActivatable);
        if (!firstActivatableItem) {
          return;
        }
        firstActivatableItem.tabIndex = 0;
      };
      const { isItem, getPossibleItems, isRtl: isRtl2, deactivateItem, activateItem, isNavigableKey, isActivatable, wrapNavigation } = config;
      this.isItem = isItem;
      this.getPossibleItems = getPossibleItems;
      this.isRtl = isRtl2;
      this.deactivateItem = deactivateItem;
      this.activateItem = activateItem;
      this.isNavigableKey = isNavigableKey;
      this.isActivatable = isActivatable;
      this.wrapNavigation = wrapNavigation ?? (() => true);
    }
    /**
     * The items being managed by the list. Additionally, attempts to see if the
     * object has a sub-item in the `.item` property.
     */
    get items() {
      const maybeItems = this.getPossibleItems();
      const items = [];
      for (const itemOrParent of maybeItems) {
        const isItem = this.isItem(itemOrParent);
        if (isItem) {
          items.push(itemOrParent);
          continue;
        }
        const subItem = itemOrParent.item;
        if (subItem && this.isItem(subItem)) {
          items.push(subItem);
        }
      }
      return items;
    }
    /**
     * Activates the next item in the list. If at the end of the list, the first
     * item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activateNextItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
    /**
     * Activates the previous item in the list. If at the start of the list, the
     * last item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activatePreviousItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
  };

  // node_modules/@material/web/menu/internal/controllers/surfacePositionController.js
  var Corner = {
    END_START: "end-start",
    END_END: "end-end",
    START_START: "start-start",
    START_END: "start-end"
  };
  var SurfacePositionController = class {
    /**
     * @param host The host to connect the controller to.
     * @param getProperties A function that returns the properties for the
     * controller.
     */
    constructor(host, getProperties) {
      this.host = host;
      this.getProperties = getProperties;
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.lastValues = {
        isOpen: false
      };
      this.host.addController(this);
    }
    /**
     * The StyleInfo map to apply to the surface via Lit's stylemap
     */
    get surfaceStyles() {
      return this.surfaceStylesInternal;
    }
    /**
     * Calculates the surface's new position required so that the surface's
     * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
     * surface inside the window viewport. This positioning also respects RTL by
     * checking `getComputedStyle()` on the surface element.
     */
    async position() {
      const { surfaceEl, anchorEl, anchorCorner: anchorCornerRaw, surfaceCorner: surfaceCornerRaw, positioning, xOffset, yOffset, disableBlockFlip, disableInlineFlip, repositionStrategy } = this.getProperties();
      const anchorCorner = anchorCornerRaw.toLowerCase().trim();
      const surfaceCorner = surfaceCornerRaw.toLowerCase().trim();
      if (!surfaceEl || !anchorEl) {
        return;
      }
      const windowInnerWidth = window.innerWidth;
      const windowInnerHeight = window.innerHeight;
      const div = document.createElement("div");
      div.style.opacity = "0";
      div.style.position = "fixed";
      div.style.display = "block";
      div.style.inset = "0";
      document.body.appendChild(div);
      const scrollbarTestRect = div.getBoundingClientRect();
      div.remove();
      const blockScrollbarHeight = window.innerHeight - scrollbarTestRect.bottom;
      const inlineScrollbarWidth = window.innerWidth - scrollbarTestRect.right;
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "0"
      };
      this.host.requestUpdate();
      await this.host.updateComplete;
      if (surfaceEl.popover && surfaceEl.isConnected) {
        surfaceEl.showPopover();
      }
      const surfaceRect = surfaceEl.getSurfacePositionClientRect ? surfaceEl.getSurfacePositionClientRect() : surfaceEl.getBoundingClientRect();
      const anchorRect = anchorEl.getSurfacePositionClientRect ? anchorEl.getSurfacePositionClientRect() : anchorEl.getBoundingClientRect();
      const [surfaceBlock, surfaceInline] = surfaceCorner.split("-");
      const [anchorBlock, anchorInline] = anchorCorner.split("-");
      const isLTR = getComputedStyle(surfaceEl).direction === "ltr";
      let { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty } = this.calculateBlock({
        surfaceRect,
        anchorRect,
        anchorBlock,
        surfaceBlock,
        yOffset,
        positioning,
        windowInnerHeight,
        blockScrollbarHeight
      });
      if (blockOutOfBoundsCorrection && !disableBlockFlip) {
        const flippedSurfaceBlock = surfaceBlock === "start" ? "end" : "start";
        const flippedAnchorBlock = anchorBlock === "start" ? "end" : "start";
        const flippedBlock = this.calculateBlock({
          surfaceRect,
          anchorRect,
          anchorBlock: flippedAnchorBlock,
          surfaceBlock: flippedSurfaceBlock,
          yOffset,
          positioning,
          windowInnerHeight,
          blockScrollbarHeight
        });
        if (blockOutOfBoundsCorrection > flippedBlock.blockOutOfBoundsCorrection) {
          blockInset = flippedBlock.blockInset;
          blockOutOfBoundsCorrection = flippedBlock.blockOutOfBoundsCorrection;
          surfaceBlockProperty = flippedBlock.surfaceBlockProperty;
        }
      }
      let { inlineInset, inlineOutOfBoundsCorrection, surfaceInlineProperty } = this.calculateInline({
        surfaceRect,
        anchorRect,
        anchorInline,
        surfaceInline,
        xOffset,
        positioning,
        isLTR,
        windowInnerWidth,
        inlineScrollbarWidth
      });
      if (inlineOutOfBoundsCorrection && !disableInlineFlip) {
        const flippedSurfaceInline = surfaceInline === "start" ? "end" : "start";
        const flippedAnchorInline = anchorInline === "start" ? "end" : "start";
        const flippedInline = this.calculateInline({
          surfaceRect,
          anchorRect,
          anchorInline: flippedAnchorInline,
          surfaceInline: flippedSurfaceInline,
          xOffset,
          positioning,
          isLTR,
          windowInnerWidth,
          inlineScrollbarWidth
        });
        if (Math.abs(inlineOutOfBoundsCorrection) > Math.abs(flippedInline.inlineOutOfBoundsCorrection)) {
          inlineInset = flippedInline.inlineInset;
          inlineOutOfBoundsCorrection = flippedInline.inlineOutOfBoundsCorrection;
          surfaceInlineProperty = flippedInline.surfaceInlineProperty;
        }
      }
      if (repositionStrategy === "move") {
        blockInset = blockInset - blockOutOfBoundsCorrection;
        inlineInset = inlineInset - inlineOutOfBoundsCorrection;
      }
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "1",
        [surfaceBlockProperty]: `${blockInset}px`,
        [surfaceInlineProperty]: `${inlineInset}px`
      };
      if (repositionStrategy === "resize") {
        if (blockOutOfBoundsCorrection) {
          this.surfaceStylesInternal["height"] = `${surfaceRect.height - blockOutOfBoundsCorrection}px`;
        }
        if (inlineOutOfBoundsCorrection) {
          this.surfaceStylesInternal["width"] = `${surfaceRect.width - inlineOutOfBoundsCorrection}px`;
        }
      }
      this.host.requestUpdate();
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the block direction.
     */
    calculateBlock(config) {
      const { surfaceRect, anchorRect, anchorBlock, surfaceBlock, yOffset, positioning, windowInnerHeight, blockScrollbarHeight } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isSurfaceBlockStart = surfaceBlock === "start" ? 1 : 0;
      const isSurfaceBlockEnd = surfaceBlock === "end" ? 1 : 0;
      const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0;
      const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset;
      const blockTopLayerOffset = isSurfaceBlockStart * anchorRect.top + isSurfaceBlockEnd * (windowInnerHeight - anchorRect.bottom - blockScrollbarHeight);
      const blockDocumentOffset = isSurfaceBlockStart * window.scrollY - isSurfaceBlockEnd * window.scrollY;
      const blockOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerHeight - blockTopLayerOffset - blockAnchorOffset - surfaceRect.height));
      const blockInset = relativeToWindow * blockTopLayerOffset + relativeToDocument * blockDocumentOffset + blockAnchorOffset;
      const surfaceBlockProperty = surfaceBlock === "start" ? "inset-block-start" : "inset-block-end";
      return { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty };
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the inline direction.
     */
    calculateInline(config) {
      const { isLTR: isLTRBool, surfaceInline, anchorInline, anchorRect, surfaceRect, xOffset, positioning, windowInnerWidth, inlineScrollbarWidth } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isLTR = isLTRBool ? 1 : 0;
      const isRTL = isLTRBool ? 0 : 1;
      const isSurfaceInlineStart = surfaceInline === "start" ? 1 : 0;
      const isSurfaceInlineEnd = surfaceInline === "end" ? 1 : 0;
      const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0;
      const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset;
      const inlineTopLayerOffsetLTR = isSurfaceInlineStart * anchorRect.left + isSurfaceInlineEnd * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth);
      const inlineTopLayerOffsetRTL = isSurfaceInlineStart * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth) + isSurfaceInlineEnd * anchorRect.left;
      const inlineTopLayerOffset = isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL;
      const inlineDocumentOffsetLTR = isSurfaceInlineStart * window.scrollX - isSurfaceInlineEnd * window.scrollX;
      const inlineDocumentOffsetRTL = isSurfaceInlineEnd * window.scrollX - isSurfaceInlineStart * window.scrollX;
      const inlineDocumentOffset = isLTR * inlineDocumentOffsetLTR + isRTL * inlineDocumentOffsetRTL;
      const inlineOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerWidth - inlineTopLayerOffset - inlineAnchorOffset - surfaceRect.width));
      const inlineInset = relativeToWindow * inlineTopLayerOffset + inlineAnchorOffset + relativeToDocument * inlineDocumentOffset;
      let surfaceInlineProperty = surfaceInline === "start" ? "inset-inline-start" : "inset-inline-end";
      if (positioning === "document" || positioning === "fixed") {
        if (surfaceInline === "start" && isLTRBool || surfaceInline === "end" && !isLTRBool) {
          surfaceInlineProperty = "left";
        } else {
          surfaceInlineProperty = "right";
        }
      }
      return {
        inlineInset,
        inlineOutOfBoundsCorrection,
        surfaceInlineProperty
      };
    }
    hostUpdate() {
      this.onUpdate();
    }
    hostUpdated() {
      this.onUpdate();
    }
    /**
     * Checks whether the properties passed into the controller have changed since
     * the last positioning. If so, it will reposition if the surface is open or
     * close it if the surface should close.
     */
    async onUpdate() {
      const props = this.getProperties();
      let hasChanged = false;
      for (const [key, value] of Object.entries(props)) {
        hasChanged = hasChanged || value !== this.lastValues[key];
        if (hasChanged)
          break;
      }
      const openChanged = this.lastValues.isOpen !== props.isOpen;
      const hasAnchor = !!props.anchorEl;
      const hasSurface = !!props.surfaceEl;
      if (hasChanged && hasAnchor && hasSurface) {
        this.lastValues.isOpen = props.isOpen;
        if (props.isOpen) {
          this.lastValues = props;
          await this.position();
          props.onOpen();
        } else if (openChanged) {
          await props.beforeClose();
          this.close();
          props.onClose();
        }
      }
    }
    /**
     * Hides the surface.
     */
    close() {
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.host.requestUpdate();
      const surfaceEl = this.getProperties().surfaceEl;
      if (surfaceEl?.popover && surfaceEl?.isConnected) {
        surfaceEl.hidePopover();
      }
    }
  };

  // node_modules/@material/web/menu/internal/controllers/typeaheadController.js
  var TYPEAHEAD_RECORD = {
    INDEX: 0,
    ITEM: 1,
    TEXT: 2
  };
  var TypeaheadController = class {
    /**
     * @param getProperties A function that returns the options of the typeahead
     * controller:
     *
     * {
     *   getItems: A function that returns an array of menu items to be searched.
     *   typeaheadBufferTime: The maximum time between each keystroke to keep the
     *       current type buffer alive.
     * }
     */
    constructor(getProperties) {
      this.getProperties = getProperties;
      this.typeaheadRecords = [];
      this.typaheadBuffer = "";
      this.cancelTypeaheadTimeout = 0;
      this.isTypingAhead = false;
      this.lastActiveRecord = null;
      this.onKeydown = (event) => {
        if (this.isTypingAhead) {
          this.typeahead(event);
        } else {
          this.beginTypeahead(event);
        }
      };
      this.endTypeahead = () => {
        this.isTypingAhead = false;
        this.typaheadBuffer = "";
        this.typeaheadRecords = [];
      };
    }
    get items() {
      return this.getProperties().getItems();
    }
    get active() {
      return this.getProperties().active;
    }
    /**
     * Sets up typingahead
     */
    beginTypeahead(event) {
      if (!this.active) {
        return;
      }
      if (event.code === "Space" || event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        return;
      }
      this.isTypingAhead = true;
      this.typeaheadRecords = this.items.map((el, index) => [
        index,
        el,
        el.typeaheadText.trim().toLowerCase()
      ]);
      this.lastActiveRecord = this.typeaheadRecords.find((record) => record[TYPEAHEAD_RECORD.ITEM].tabIndex === 0) ?? null;
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.typeahead(event);
    }
    /**
     * Performs the typeahead. Based on the normalized items and the current text
     * buffer, finds the _next_ item with matching text and activates it.
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: 'o'
     * user types: l
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Orange
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange (active), Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     */
    typeahead(event) {
      if (event.defaultPrevented)
        return;
      clearTimeout(this.cancelTypeaheadTimeout);
      if (event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        this.endTypeahead();
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        return;
      }
      if (event.code === "Space") {
        event.preventDefault();
      }
      this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime);
      this.typaheadBuffer += event.key.toLowerCase();
      const lastActiveIndex = this.lastActiveRecord ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX] : -1;
      const numRecords = this.typeaheadRecords.length;
      const rebaseIndexOnActive = (record) => {
        return (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) % numRecords;
      };
      const matchingRecords = this.typeaheadRecords.filter((record) => !record[TYPEAHEAD_RECORD.ITEM].disabled && record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)).sort((a4, b3) => rebaseIndexOnActive(a4) - rebaseIndexOnActive(b3));
      if (matchingRecords.length === 0) {
        clearTimeout(this.cancelTypeaheadTimeout);
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        this.endTypeahead();
        return;
      }
      const isNewQuery = this.typaheadBuffer.length === 1;
      let nextRecord;
      if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
        nextRecord = matchingRecords[1] ?? matchingRecords[0];
      } else {
        nextRecord = matchingRecords[0];
      }
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.lastActiveRecord = nextRecord;
      nextRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = 0;
      nextRecord[TYPEAHEAD_RECORD.ITEM].focus();
      return;
    }
  };

  // node_modules/@material/web/menu/internal/menu.js
  var DEFAULT_TYPEAHEAD_BUFFER_TIME = 200;
  var submenuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowDown,
    NavigableKeys.ArrowUp,
    NavigableKeys.Home,
    NavigableKeys.End
  ]);
  var menuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowLeft,
    NavigableKeys.ArrowRight,
    ...submenuNavKeys
  ]);
  function getFocusedElement(activeDoc = document) {
    let activeEl = activeDoc.activeElement;
    while (activeEl && activeEl?.shadowRoot?.activeElement) {
      activeEl = activeEl.shadowRoot.activeElement;
    }
    return activeEl;
  }
  var Menu = class extends i4 {
    /**
     * Whether the menu is animating upwards or downwards when opening. This is
     * helpful for calculating some animation calculations.
     */
    get openDirection() {
      const menuCornerBlock = this.menuCorner.split("-")[0];
      return menuCornerBlock === "start" ? "DOWN" : "UP";
    }
    /**
     * The element which the menu should align to. If `anchor` is set to a
     * non-empty idref string, then `anchorEl` will resolve to the element with
     * the given id in the same root node. Otherwise, `null`.
     */
    get anchorElement() {
      if (this.anchor) {
        return this.getRootNode().querySelector(`#${this.anchor}`);
      }
      return this.currentAnchorElement;
    }
    set anchorElement(element) {
      this.currentAnchorElement = element;
      this.requestUpdate("anchorElement");
    }
    constructor() {
      super();
      this.anchor = "";
      this.positioning = "absolute";
      this.quick = false;
      this.hasOverflow = false;
      this.open = false;
      this.xOffset = 0;
      this.yOffset = 0;
      this.noHorizontalFlip = false;
      this.noVerticalFlip = false;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.anchorCorner = Corner.END_START;
      this.menuCorner = Corner.START_START;
      this.stayOpenOnOutsideClick = false;
      this.stayOpenOnFocusout = false;
      this.skipRestoreFocus = false;
      this.defaultFocus = FocusState.FIRST_ITEM;
      this.noNavigationWrap = false;
      this.typeaheadActive = true;
      this.isSubmenu = false;
      this.pointerPath = [];
      this.isRepositioning = false;
      this.openCloseAnimationSignal = createAnimationSignal();
      this.listController = new ListController({
        isItem: (maybeItem) => {
          return maybeItem.hasAttribute("md-menu-item");
        },
        getPossibleItems: () => this.slotItems,
        isRtl: () => getComputedStyle(this).direction === "rtl",
        deactivateItem: (item) => {
          item.selected = false;
          item.tabIndex = -1;
        },
        activateItem: (item) => {
          item.selected = true;
          item.tabIndex = 0;
        },
        isNavigableKey: (key) => {
          if (!this.isSubmenu) {
            return menuNavKeys.has(key);
          }
          const isRtl2 = getComputedStyle(this).direction === "rtl";
          const arrowOpen = isRtl2 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
          if (key === arrowOpen) {
            return true;
          }
          return submenuNavKeys.has(key);
        },
        wrapNavigation: () => !this.noNavigationWrap
      });
      this.lastFocusedElement = null;
      this.typeaheadController = new TypeaheadController(() => {
        return {
          getItems: () => this.items,
          typeaheadBufferTime: this.typeaheadDelay,
          active: this.typeaheadActive
        };
      });
      this.currentAnchorElement = null;
      this.internals = // Cast needed for closure
      this.attachInternals();
      this.menuPositionController = new SurfacePositionController(this, () => {
        return {
          anchorCorner: this.anchorCorner,
          surfaceCorner: this.menuCorner,
          surfaceEl: this.surfaceEl,
          anchorEl: this.anchorElement,
          positioning: this.positioning === "popover" ? "document" : this.positioning,
          isOpen: this.open,
          xOffset: this.xOffset,
          yOffset: this.yOffset,
          disableBlockFlip: this.noVerticalFlip,
          disableInlineFlip: this.noHorizontalFlip,
          onOpen: this.onOpened,
          beforeClose: this.beforeClose,
          onClose: this.onClosed,
          // We can't resize components that have overflow like menus with
          // submenus because the overflow-y will show menu items / content
          // outside the bounds of the menu. Popover API fixes this because each
          // submenu is hoisted to the top-layer and are not considered overflow
          // content.
          repositionStrategy: this.hasOverflow && this.positioning !== "popover" ? "move" : "resize"
        };
      });
      this.onWindowResize = () => {
        if (this.isRepositioning || this.positioning !== "document" && this.positioning !== "fixed" && this.positioning !== "popover") {
          return;
        }
        this.isRepositioning = true;
        this.reposition();
        this.isRepositioning = false;
      };
      this.handleFocusout = async (event) => {
        const anchorEl = this.anchorElement;
        if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(anchorEl)) {
          return;
        }
        if (event.relatedTarget) {
          if (isElementInSubtree(event.relatedTarget, this) || this.pointerPath.length !== 0 && isElementInSubtree(event.relatedTarget, anchorEl)) {
            return;
          }
        } else if (this.pointerPath.includes(this)) {
          return;
        }
        const oldRestoreFocus = this.skipRestoreFocus;
        this.skipRestoreFocus = true;
        this.close();
        await this.updateComplete;
        this.skipRestoreFocus = oldRestoreFocus;
      };
      this.onOpened = async () => {
        this.lastFocusedElement = getFocusedElement();
        const items = this.items;
        const activeItemRecord = getActiveItem(items);
        if (activeItemRecord && this.defaultFocus !== FocusState.NONE) {
          activeItemRecord.item.tabIndex = -1;
        }
        let animationAborted = !this.quick;
        if (this.quick) {
          this.dispatchEvent(new Event("opening"));
        } else {
          animationAborted = !!await this.animateOpen();
        }
        switch (this.defaultFocus) {
          case FocusState.FIRST_ITEM:
            const first = getFirstActivatableItem(items);
            if (first) {
              first.tabIndex = 0;
              first.focus();
              await first.updateComplete;
            }
            break;
          case FocusState.LAST_ITEM:
            const last = getLastActivatableItem(items);
            if (last) {
              last.tabIndex = 0;
              last.focus();
              await last.updateComplete;
            }
            break;
          case FocusState.LIST_ROOT:
            this.focus();
            break;
          default:
          case FocusState.NONE:
            break;
        }
        if (!animationAborted) {
          this.dispatchEvent(new Event("opened"));
        }
      };
      this.beforeClose = async () => {
        this.open = false;
        if (!this.skipRestoreFocus) {
          this.lastFocusedElement?.focus?.();
        }
        if (!this.quick) {
          await this.animateClose();
        }
      };
      this.onClosed = () => {
        if (this.quick) {
          this.dispatchEvent(new Event("closing"));
          this.dispatchEvent(new Event("closed"));
        }
      };
      this.onWindowPointerdown = (event) => {
        this.pointerPath = event.composedPath();
      };
      this.onDocumentClick = (event) => {
        if (!this.open) {
          return;
        }
        const path = event.composedPath();
        if (!this.stayOpenOnOutsideClick && !path.includes(this) && !path.includes(this.anchorElement)) {
          this.open = false;
        }
      };
      if (!o7) {
        this.internals.role = "menu";
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keydown", this.captureKeydown, { capture: true });
        this.addEventListener("focusout", this.handleFocusout);
      }
    }
    /**
     * The menu items associated with this menu. The items must be `MenuItem`s and
     * have both the `md-menu-item` and `md-list-item` attributes.
     */
    get items() {
      return this.listController.items;
    }
    willUpdate(changed) {
      if (!changed.has("open")) {
        return;
      }
      if (this.open) {
        this.removeAttribute("aria-hidden");
        return;
      }
      this.setAttribute("aria-hidden", "true");
    }
    update(changed) {
      if (changed.has("open")) {
        if (this.open) {
          this.setUpGlobalEventListeners();
        } else {
          this.cleanUpGlobalEventListeners();
        }
      }
      if (changed.has("positioning") && this.positioning === "popover" && // type required for Google JS conformance
      !this.showPopover) {
        this.positioning = "fixed";
      }
      super.update(changed);
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.open) {
        this.setUpGlobalEventListeners();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.cleanUpGlobalEventListeners();
    }
    getBoundingClientRect() {
      if (!this.surfaceEl) {
        return super.getBoundingClientRect();
      }
      return this.surfaceEl.getBoundingClientRect();
    }
    getClientRects() {
      if (!this.surfaceEl) {
        return super.getClientRects();
      }
      return this.surfaceEl.getClientRects();
    }
    render() {
      return this.renderSurface();
    }
    /**
     * Renders the positionable surface element and its contents.
     */
    renderSurface() {
      return x`
      <div
        class="menu ${e8(this.getSurfaceClasses())}"
        style=${o12(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning === "popover" ? "manual" : E}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
    }
    /**
     * Renders the menu items' slot
     */
    renderMenuItems() {
      return x`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
    }
    /**
     * Renders the elevation component.
     */
    renderElevation() {
      return x`<md-elevation part="elevation"></md-elevation>`;
    }
    getSurfaceClasses() {
      return {
        open: this.open,
        fixed: this.positioning === "fixed",
        "has-overflow": this.hasOverflow
      };
    }
    captureKeydown(event) {
      if (event.target === this && !event.defaultPrevented && isClosableKey(event.code)) {
        event.preventDefault();
        this.close();
      }
      this.typeaheadController.onKeydown(event);
    }
    /**
     * Performs the opening animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     *
     * @return A promise that resolve to `true` if the animation was aborted,
     *     `false` if it was not aborted.
     */
    async animateOpen() {
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl)
        return true;
      const openDirection = this.openDirection;
      this.dispatchEvent(new Event("opening"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const openingUpwards = openDirection === "UP";
      const children = this.items;
      const FULL_DURATION = 500;
      const SURFACE_OPACITY_DURATION = 50;
      const ITEM_OPACITY_DURATION = 250;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([{ height: "0px" }, { height: `${height}px` }], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED
      });
      const upPositionCorrectionAnimation = slotEl.animate([
        { transform: openingUpwards ? `translateY(-${height}px)` : "" },
        { transform: "" }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
      const childrenAnimations = [];
      for (let i9 = 0; i9 < children.length; i9++) {
        const directionalIndex = openingUpwards ? children.length - 1 - i9 : i9;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: DELAY_BETWEEN_ITEMS * i9
        });
        child.classList.toggle("md-menu-hidden", true);
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", false);
        });
        childrenAnimations.push([child, animation]);
      }
      let resolveAnimation = (value) => {
      };
      const animationFinished = new Promise((resolve) => {
        resolveAnimation = resolve;
      });
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        upPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          child.classList.toggle("md-menu-hidden", false);
          animation.cancel();
        });
        resolveAnimation(true);
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        this.openCloseAnimationSignal.finish();
        resolveAnimation(false);
      });
      return await animationFinished;
    }
    /**
     * Performs the closing animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    animateClose() {
      let resolve;
      const animationEnded = new Promise((res) => {
        resolve = res;
      });
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl) {
        resolve(false);
        return animationEnded;
      }
      const openDirection = this.openDirection;
      const closingDownwards = openDirection === "UP";
      this.dispatchEvent(new Event("closing"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const children = this.items;
      const FULL_DURATION = 150;
      const SURFACE_OPACITY_DURATION = 50;
      const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
      const ITEM_OPACITY_DURATION = 50;
      const ITEM_OPACITY_INITIAL_DELAY = 50;
      const END_HEIGHT_PERCENTAGE = 0.35;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([
        { height: `${height}px` },
        { height: `${height * END_HEIGHT_PERCENTAGE}px` }
      ], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED_ACCELERATE
      });
      const downPositionCorrectionAnimation = slotEl.animate([
        { transform: "" },
        {
          transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : ""
        }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
      const childrenAnimations = [];
      for (let i9 = 0; i9 < children.length; i9++) {
        const directionalIndex = closingDownwards ? i9 : children.length - 1 - i9;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i9
        });
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", true);
        });
        childrenAnimations.push([child, animation]);
      }
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        downPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          animation.cancel();
          child.classList.toggle("md-menu-hidden", false);
        });
        resolve(false);
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        childrenAnimations.forEach(([child]) => {
          child.classList.toggle("md-menu-hidden", false);
        });
        this.openCloseAnimationSignal.finish();
        this.dispatchEvent(new Event("closed"));
        resolve(true);
      });
      return animationEnded;
    }
    handleKeydown(event) {
      this.pointerPath = [];
      this.listController.handleKeydown(event);
    }
    setUpGlobalEventListeners() {
      document.addEventListener("click", this.onDocumentClick, { capture: true });
      window.addEventListener("pointerdown", this.onWindowPointerdown);
      document.addEventListener("resize", this.onWindowResize, { passive: true });
      window.addEventListener("resize", this.onWindowResize, { passive: true });
    }
    cleanUpGlobalEventListeners() {
      document.removeEventListener("click", this.onDocumentClick, {
        capture: true
      });
      window.removeEventListener("pointerdown", this.onWindowPointerdown);
      document.removeEventListener("resize", this.onWindowResize);
      window.removeEventListener("resize", this.onWindowResize);
    }
    onCloseMenu() {
      this.close();
    }
    onDeactivateItems(event) {
      event.stopPropagation();
      this.listController.onDeactivateItems();
    }
    onRequestActivation(event) {
      event.stopPropagation();
      this.listController.onRequestActivation(event);
    }
    handleDeactivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = false;
    }
    handleActivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = true;
    }
    handleStayOpenOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = true;
    }
    handleCloseOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = false;
    }
    close() {
      this.open = false;
      const maybeSubmenu = this.slotItems;
      maybeSubmenu.forEach((item) => {
        item.close?.();
      });
    }
    show() {
      this.open = true;
    }
    /**
     * Activates the next item in the menu. If at the end of the menu, the first
     * item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activateNextItem() {
      return this.listController.activateNextItem() ?? null;
    }
    /**
     * Activates the previous item in the menu. If at the start of the menu, the
     * last item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activatePreviousItem() {
      return this.listController.activatePreviousItem() ?? null;
    }
    /**
     * Repositions the menu if it is open.
     *
     * Useful for the case where document or window-positioned menus have their
     * anchors moved while open.
     */
    reposition() {
      if (this.open) {
        this.menuPositionController.position();
      }
    }
  };
  __decorate([
    e4(".menu")
  ], Menu.prototype, "surfaceEl", void 0);
  __decorate([
    e4("slot")
  ], Menu.prototype, "slotEl", void 0);
  __decorate([
    n3()
  ], Menu.prototype, "anchor", void 0);
  __decorate([
    n3()
  ], Menu.prototype, "positioning", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Menu.prototype, "quick", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-overflow" })
  ], Menu.prototype, "hasOverflow", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Menu.prototype, "open", void 0);
  __decorate([
    n3({ type: Number, attribute: "x-offset" })
  ], Menu.prototype, "xOffset", void 0);
  __decorate([
    n3({ type: Number, attribute: "y-offset" })
  ], Menu.prototype, "yOffset", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-horizontal-flip" })
  ], Menu.prototype, "noHorizontalFlip", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-vertical-flip" })
  ], Menu.prototype, "noVerticalFlip", void 0);
  __decorate([
    n3({ type: Number, attribute: "typeahead-delay" })
  ], Menu.prototype, "typeaheadDelay", void 0);
  __decorate([
    n3({ attribute: "anchor-corner" })
  ], Menu.prototype, "anchorCorner", void 0);
  __decorate([
    n3({ attribute: "menu-corner" })
  ], Menu.prototype, "menuCorner", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "stay-open-on-outside-click" })
  ], Menu.prototype, "stayOpenOnOutsideClick", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "stay-open-on-focusout" })
  ], Menu.prototype, "stayOpenOnFocusout", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "skip-restore-focus" })
  ], Menu.prototype, "skipRestoreFocus", void 0);
  __decorate([
    n3({ attribute: "default-focus" })
  ], Menu.prototype, "defaultFocus", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-navigation-wrap" })
  ], Menu.prototype, "noNavigationWrap", void 0);
  __decorate([
    o4({ flatten: true })
  ], Menu.prototype, "slotItems", void 0);
  __decorate([
    r4()
  ], Menu.prototype, "typeaheadActive", void 0);

  // node_modules/@material/web/menu/internal/menu-styles.js
  var styles25 = i`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:var(--md-menu-top-space, 8px) var(--md-menu-bottom-space, 8px)}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;

  // node_modules/@material/web/menu/menu.js
  var MdMenu = class MdMenu2 extends Menu {
  };
  MdMenu.styles = [styles25];
  MdMenu = __decorate([
    t("md-menu")
  ], MdMenu);

  // node_modules/@material/web/labs/behaviors/validators/select-validator.js
  var SelectValidator = class extends Validator {
    computeValidity(state) {
      if (!this.selectControl) {
        this.selectControl = document.createElement("select");
      }
      B(x`<option value=${state.value}></option>`, this.selectControl);
      this.selectControl.value = state.value;
      this.selectControl.required = state.required;
      return {
        validity: this.selectControl.validity,
        validationMessage: this.selectControl.validationMessage
      };
    }
    equals(prev, next) {
      return prev.value === next.value && prev.required === next.required;
    }
    copy({ value, required }) {
      return { value, required };
    }
  };

  // node_modules/@material/web/select/internal/shared.js
  function getSelectedItems(items) {
    const selectedItemRecords = [];
    for (let i9 = 0; i9 < items.length; i9++) {
      const item = items[i9];
      if (item.selected) {
        selectedItemRecords.push([item, i9]);
      }
    }
    return selectedItemRecords;
  }

  // node_modules/@material/web/select/internal/select.js
  var _a;
  var VALUE = Symbol("value");
  var selectBaseClass = mixinDelegatesAria(mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i4)))));
  var Select = class extends selectBaseClass {
    /**
     * The value of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `value` setting `value` will incur a DOM query.
     */
    get value() {
      return this[VALUE];
    }
    set value(value) {
      if (o7)
        return;
      this.lastUserSetValue = value;
      this.select(value);
    }
    get options() {
      return this.menu?.items ?? [];
    }
    /**
     * The index of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `selectedIndex` setting `selectedIndex` will incur a
     * DOM query.
     */
    get selectedIndex() {
      const [_option, index] = (this.getSelectedOptions() ?? [])[0] ?? [];
      return index ?? -1;
    }
    set selectedIndex(index) {
      this.lastUserSetSelectedIndex = index;
      this.selectIndex(index);
    }
    /**
     * Returns an array of selected options.
     *
     * NOTE: md-select only supports single selection.
     */
    get selectedOptions() {
      return (this.getSelectedOptions() ?? []).map(([option]) => option);
    }
    get hasError() {
      return this.error || this.nativeError;
    }
    constructor() {
      super();
      this.quick = false;
      this.required = false;
      this.errorText = "";
      this.label = "";
      this.noAsterisk = false;
      this.supportingText = "";
      this.error = false;
      this.menuPositioning = "popover";
      this.clampMenuWidth = false;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.hasLeadingIcon = false;
      this.displayText = "";
      this.menuAlign = "start";
      this[_a] = "";
      this.lastUserSetValue = null;
      this.lastUserSetSelectedIndex = null;
      this.lastSelectedOption = null;
      this.lastSelectedOptionRecords = [];
      this.nativeError = false;
      this.nativeErrorText = "";
      this.focused = false;
      this.open = false;
      this.defaultFocus = FocusState.NONE;
      this.prevOpen = this.open;
      this.selectWidth = 0;
      if (o7) {
        return;
      }
      this.addEventListener("focus", this.handleFocus.bind(this));
      this.addEventListener("blur", this.handleBlur.bind(this));
    }
    /**
     * Selects an option given the value of the option, and updates MdSelect's
     * value.
     */
    select(value) {
      const optionToSelect = this.options.find((option) => option.value === value);
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Selects an option given the index of the option, and updates MdSelect's
     * value.
     */
    selectIndex(index) {
      const optionToSelect = this.options[index];
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Reset the select to its default value.
     */
    reset() {
      for (const option of this.options) {
        option.selected = option.hasAttribute("selected");
      }
      this.updateValueAndDisplayText();
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    /** Shows the picker. If it's already open, this is a no-op. */
    showPicker() {
      this.open = true;
    }
    [(_a = VALUE, onReportValidity)](invalidEvent) {
      invalidEvent?.preventDefault();
      const prevMessage = this.getErrorText();
      this.nativeError = !!invalidEvent;
      this.nativeErrorText = this.validationMessage;
      if (prevMessage === this.getErrorText()) {
        this.field?.reannounceError();
      }
    }
    update(changed) {
      if (!this.hasUpdated) {
        this.initUserSelection();
      }
      if (this.prevOpen !== this.open && this.open) {
        const selectRect = this.getBoundingClientRect();
        this.selectWidth = selectRect.width;
      }
      this.prevOpen = this.open;
      super.update(changed);
    }
    render() {
      return x`
      <span
        class="select ${e8(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `;
    }
    async firstUpdated(changed) {
      await this.menu?.updateComplete;
      if (!this.lastSelectedOptionRecords.length) {
        this.initUserSelection();
      }
      if (!this.lastSelectedOptionRecords.length && !o7 && !this.options.length) {
        setTimeout(() => {
          this.updateValueAndDisplayText();
        });
      }
      super.firstUpdated(changed);
    }
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "error": this.error,
        "open": this.open
      };
    }
    renderField() {
      const ariaLabel = this.ariaLabel || this.label;
      return u4`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled ? "-1" : "0"}
          aria-label=${ariaLabel || E}
          aria-describedby="description"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          ?no-asterisk=${this.noAsterisk}
          .focused=${this.focused || this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`;
    }
    renderFieldContent() {
      return [
        this.renderLeadingIcon(),
        this.renderLabel(),
        this.renderTrailingIcon()
      ];
    }
    renderLeadingIcon() {
      return x`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderTrailingIcon() {
      return x`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `;
    }
    renderLabel() {
      return x`<div id="label">${this.displayText || x`&nbsp;`}</div>`;
    }
    renderMenu() {
      const ariaLabel = this.label || this.ariaLabel;
      return x`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${ariaLabel || E}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${o12({
        "--__menu-min-width": `${this.selectWidth}px`,
        "--__menu-max-width": this.clampMenuWidth ? `${this.selectWidth}px` : void 0
      })}
        no-navigation-wrap
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign === "start" ? "end-start" : "end-end"}
        .menuCorner=${this.menuAlign === "start" ? "start-start" : "start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`;
    }
    renderMenuContent() {
      return x`<slot></slot>`;
    }
    /**
     * Handles opening the select on keydown and typahead selection when the menu
     * is closed.
     */
    handleKeydown(event) {
      if (this.open || this.disabled || !this.menu) {
        return;
      }
      const typeaheadController = this.menu.typeaheadController;
      const isOpenKey = event.code === "Space" || event.code === "ArrowDown" || event.code === "ArrowUp" || event.code === "End" || event.code === "Home" || event.code === "Enter";
      if (!typeaheadController.isTypingAhead && isOpenKey) {
        event.preventDefault();
        this.open = true;
        switch (event.code) {
          case "Space":
          case "ArrowDown":
          case "Enter":
            this.defaultFocus = FocusState.NONE;
            break;
          case "End":
            this.defaultFocus = FocusState.LAST_ITEM;
            break;
          case "ArrowUp":
          case "Home":
            this.defaultFocus = FocusState.FIRST_ITEM;
            break;
          default:
            break;
        }
        return;
      }
      const isPrintableKey = event.key.length === 1;
      if (isPrintableKey) {
        typeaheadController.onKeydown(event);
        event.preventDefault();
        const { lastActiveRecord } = typeaheadController;
        if (!lastActiveRecord) {
          return;
        }
        this.labelEl?.setAttribute?.("aria-live", "polite");
        const hasChanged = this.selectItem(lastActiveRecord[TYPEAHEAD_RECORD.ITEM]);
        if (hasChanged) {
          this.dispatchInteractionEvents();
        }
      }
    }
    handleClick() {
      this.open = !this.open;
    }
    handleFocus() {
      this.focused = true;
    }
    handleBlur() {
      this.focused = false;
    }
    /**
     * Handles closing the menu when the focus leaves the select's subtree.
     */
    handleFocusout(event) {
      if (event.relatedTarget && isElementInSubtree(event.relatedTarget, this)) {
        return;
      }
      this.open = false;
    }
    /**
     * Gets a list of all selected select options as a list item record array.
     *
     * @return An array of selected list option records.
     */
    getSelectedOptions() {
      if (!this.menu) {
        this.lastSelectedOptionRecords = [];
        return null;
      }
      const items = this.menu.items;
      this.lastSelectedOptionRecords = getSelectedItems(items);
      return this.lastSelectedOptionRecords;
    }
    async getUpdateComplete() {
      await this.menu?.updateComplete;
      return super.getUpdateComplete();
    }
    /**
     * Gets the selected options from the DOM, and updates the value and display
     * text to the first selected option's value and headline respectively.
     *
     * @return Whether or not the selected option has changed since last update.
     */
    updateValueAndDisplayText() {
      const selectedOptions = this.getSelectedOptions() ?? [];
      let hasSelectedOptionChanged = false;
      if (selectedOptions.length) {
        const [firstSelectedOption] = selectedOptions[0];
        hasSelectedOptionChanged = this.lastSelectedOption !== firstSelectedOption;
        this.lastSelectedOption = firstSelectedOption;
        this[VALUE] = firstSelectedOption.value;
        this.displayText = firstSelectedOption.displayText;
      } else {
        hasSelectedOptionChanged = this.lastSelectedOption !== null;
        this.lastSelectedOption = null;
        this[VALUE] = "";
        this.displayText = "";
      }
      return hasSelectedOptionChanged;
    }
    /**
     * Focuses and activates the last selected item upon opening, and resets other
     * active items.
     */
    async handleOpening(e10) {
      this.labelEl?.removeAttribute?.("aria-live");
      this.redispatchEvent(e10);
      if (this.defaultFocus !== FocusState.NONE) {
        return;
      }
      const items = this.menu.items;
      const activeItem = getActiveItem(items)?.item;
      let [selectedItem] = this.lastSelectedOptionRecords[0] ?? [null];
      if (activeItem && activeItem !== selectedItem) {
        activeItem.tabIndex = -1;
      }
      selectedItem = selectedItem ?? items[0];
      if (selectedItem) {
        selectedItem.tabIndex = 0;
        selectedItem.focus();
      }
    }
    redispatchEvent(e10) {
      redispatchEvent(this, e10);
    }
    handleClosed(e10) {
      this.open = false;
      this.redispatchEvent(e10);
    }
    /**
     * Determines the reason for closing, and updates the UI accordingly.
     */
    handleCloseMenu(event) {
      const reason = event.detail.reason;
      const item = event.detail.itemPath[0];
      this.open = false;
      let hasChanged = false;
      if (reason.kind === "click-selection") {
        hasChanged = this.selectItem(item);
      } else if (reason.kind === "keydown" && isSelectableKey(reason.key)) {
        hasChanged = this.selectItem(item);
      } else {
        item.tabIndex = -1;
        item.blur();
      }
      if (hasChanged) {
        this.dispatchInteractionEvents();
      }
    }
    /**
     * Selects a given option, deselects other options, and updates the UI.
     *
     * @return Whether the last selected option has changed.
     */
    selectItem(item) {
      const selectedOptions = this.getSelectedOptions() ?? [];
      selectedOptions.forEach(([option]) => {
        if (item !== option) {
          option.selected = false;
        }
      });
      item.selected = true;
      return this.updateValueAndDisplayText();
    }
    /**
     * Handles updating selection when an option element requests selection via
     * property / attribute change.
     */
    handleRequestSelection(event) {
      const requestingOptionEl = event.target;
      if (this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.selectItem(requestingOptionEl);
    }
    /**
     * Handles updating selection when an option element requests deselection via
     * property / attribute change.
     */
    handleRequestDeselection(event) {
      const requestingOptionEl = event.target;
      if (!this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.updateValueAndDisplayText();
    }
    /**
     * Attempts to initialize the selected option from user-settable values like
     * SSR, setting `value`, or `selectedIndex` at startup.
     */
    initUserSelection() {
      if (this.lastUserSetValue && !this.lastSelectedOptionRecords.length) {
        this.select(this.lastUserSetValue);
      } else if (this.lastUserSetSelectedIndex !== null && !this.lastSelectedOptionRecords.length) {
        this.selectIndex(this.lastUserSetSelectedIndex);
      } else {
        this.updateValueAndDisplayText();
      }
    }
    handleIconChange() {
      this.hasLeadingIcon = this.leadingIcons.length > 0;
    }
    /**
     * Dispatches the `input` and `change` events.
     */
    dispatchInteractionEvents() {
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    getErrorText() {
      return this.error ? this.errorText : this.nativeErrorText;
    }
    [getFormValue]() {
      return this.value;
    }
    formResetCallback() {
      this.reset();
    }
    formStateRestoreCallback(state) {
      this.value = state;
    }
    click() {
      this.field?.click();
    }
    [createValidator]() {
      return new SelectValidator(() => this);
    }
    [getValidityAnchor]() {
      return this.field;
    }
  };
  Select.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean })
  ], Select.prototype, "quick", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Select.prototype, "required", void 0);
  __decorate([
    n3({ type: String, attribute: "error-text" })
  ], Select.prototype, "errorText", void 0);
  __decorate([
    n3()
  ], Select.prototype, "label", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-asterisk" })
  ], Select.prototype, "noAsterisk", void 0);
  __decorate([
    n3({ type: String, attribute: "supporting-text" })
  ], Select.prototype, "supportingText", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Select.prototype, "error", void 0);
  __decorate([
    n3({ attribute: "menu-positioning" })
  ], Select.prototype, "menuPositioning", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "clamp-menu-width" })
  ], Select.prototype, "clampMenuWidth", void 0);
  __decorate([
    n3({ type: Number, attribute: "typeahead-delay" })
  ], Select.prototype, "typeaheadDelay", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-leading-icon" })
  ], Select.prototype, "hasLeadingIcon", void 0);
  __decorate([
    n3({ attribute: "display-text" })
  ], Select.prototype, "displayText", void 0);
  __decorate([
    n3({ attribute: "menu-align" })
  ], Select.prototype, "menuAlign", void 0);
  __decorate([
    n3()
  ], Select.prototype, "value", null);
  __decorate([
    n3({ type: Number, attribute: "selected-index" })
  ], Select.prototype, "selectedIndex", null);
  __decorate([
    r4()
  ], Select.prototype, "nativeError", void 0);
  __decorate([
    r4()
  ], Select.prototype, "nativeErrorText", void 0);
  __decorate([
    r4()
  ], Select.prototype, "focused", void 0);
  __decorate([
    r4()
  ], Select.prototype, "open", void 0);
  __decorate([
    r4()
  ], Select.prototype, "defaultFocus", void 0);
  __decorate([
    e4(".field")
  ], Select.prototype, "field", void 0);
  __decorate([
    e4("md-menu")
  ], Select.prototype, "menu", void 0);
  __decorate([
    e4("#label")
  ], Select.prototype, "labelEl", void 0);
  __decorate([
    o4({ slot: "leading-icon", flatten: true })
  ], Select.prototype, "leadingIcons", void 0);

  // node_modules/@material/web/select/internal/outlined-select.js
  var OutlinedSelect = class extends Select {
    constructor() {
      super(...arguments);
      this.fieldTag = i7`md-outlined-field`;
    }
  };

  // node_modules/@material/web/select/internal/outlined-select-styles.js
  var styles26 = i`:host{--_text-field-disabled-input-text-color: var(--md-outlined-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-outlined-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-outlined-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-outlined-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-outlined-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-outlined-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-outline-color: var(--md-outlined-select-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-outline-opacity: var(--md-outlined-select-text-field-disabled-outline-opacity, 0.12);--_text-field-disabled-outline-width: var(--md-outlined-select-text-field-disabled-outline-width, 1px);--_text-field-disabled-supporting-text-color: var(--md-outlined-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-outlined-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-outlined-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-outlined-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-focus-input-text-color: var(--md-outlined-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-outlined-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-outlined-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-outline-color: var(--md-outlined-select-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-supporting-text-color: var(--md-outlined-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-outlined-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-input-text-color: var(--md-outlined-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-outlined-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-outlined-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-outline-color: var(--md-outlined-select-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-supporting-text-color: var(--md-outlined-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-outlined-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-outlined-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-outlined-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-outlined-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-outline-color: var(--md-outlined-select-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-supporting-text-color: var(--md-outlined-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-outlined-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-input-text-color: var(--md-outlined-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-outlined-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-outlined-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-outline-color: var(--md-outlined-select-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-outline-width: var(--md-outlined-select-text-field-focus-outline-width, 3px);--_text-field-focus-supporting-text-color: var(--md-outlined-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-outlined-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-input-text-color: var(--md-outlined-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-outlined-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-outlined-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-outline-color: var(--md-outlined-select-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-outline-width: var(--md-outlined-select-text-field-hover-outline-width, 1px);--_text-field-hover-supporting-text-color: var(--md-outlined-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-outlined-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-outlined-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-outlined-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-outlined-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-outlined-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-outlined-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-outlined-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-outlined-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-outlined-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-outlined-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-outlined-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-outlined-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-outlined-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-outlined-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-outlined-select-text-field-leading-icon-size, 24px);--_text-field-outline-color: var(--md-outlined-select-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_text-field-outline-width: var(--md-outlined-select-text-field-outline-width, 1px);--_text-field-supporting-text-color: var(--md-outlined-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-outlined-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-outlined-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-outlined-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-outlined-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-outlined-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-outlined-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-outlined-select-text-field-container-shape-start-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-outlined-select-text-field-container-shape-start-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-outlined-select-text-field-container-shape-end-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-start: var(--md-outlined-select-text-field-container-shape-end-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--md-outlined-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-outlined-field-content-color: var(--_text-field-input-text-color);--md-outlined-field-content-font: var(--_text-field-input-text-font);--md-outlined-field-content-line-height: var(--_text-field-input-text-line-height);--md-outlined-field-content-size: var(--_text-field-input-text-size);--md-outlined-field-content-weight: var(--_text-field-input-text-weight);--md-outlined-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_text-field-disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_text-field-disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_text-field-disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_text-field-error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_text-field-error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_text-field-error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_text-field-error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_text-field-focus-outline-color);--md-outlined-field-focus-outline-width: var(--_text-field-focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_text-field-hover-outline-color);--md-outlined-field-hover-outline-width: var(--_text-field-hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_text-field-label-text-color);--md-outlined-field-label-text-font: var(--_text-field-label-text-font);--md-outlined-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-outlined-field-label-text-size: var(--_text-field-label-text-size);--md-outlined-field-label-text-weight: var(--_text-field-label-text-weight);--md-outlined-field-leading-content-color: var(--_text-field-leading-icon-color);--md-outlined-field-outline-color: var(--_text-field-outline-color);--md-outlined-field-outline-width: var(--_text-field-outline-width);--md-outlined-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-outlined-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-outlined-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`;

  // node_modules/@material/web/select/internal/shared-styles.js
  var styles27 = i`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`;

  // node_modules/@material/web/select/outlined-select.js
  var MdOutlinedSelect = class MdOutlinedSelect2 extends OutlinedSelect {
  };
  MdOutlinedSelect.styles = [styles27, styles26];
  MdOutlinedSelect = __decorate([
    t("md-outlined-select")
  ], MdOutlinedSelect);

  // node_modules/@material/web/dialog/internal/animations.js
  var DIALOG_DEFAULT_OPEN_ANIMATION = {
    dialog: [
      [
        // Dialog slide down
        [{ "transform": "translateY(-50px)" }, { "transform": "translateY(0)" }],
        { duration: 500, easing: EASING.EMPHASIZED }
      ]
    ],
    scrim: [
      [
        // Scrim fade in
        [{ "opacity": 0 }, { "opacity": 0.32 }],
        { duration: 500, easing: "linear" }
      ]
    ],
    container: [
      [
        // Container fade in
        [{ "opacity": 0 }, { "opacity": 1 }],
        { duration: 50, easing: "linear", pseudoElement: "::before" }
      ],
      [
        // Container grow
        // Note: current spec says to grow from 0dp->100% and shrink from
        // 100%->35%. We change this to 35%->100% to simplify the animation that
        // is supposed to clip content as it grows. From 0dp it's possible to see
        // text/actions appear before the container has fully grown.
        [{ "height": "35%" }, { "height": "100%" }],
        { duration: 500, easing: EASING.EMPHASIZED, pseudoElement: "::before" }
      ]
    ],
    headline: [
      [
        // Headline fade in
        [{ "opacity": 0 }, { "opacity": 0, offset: 0.2 }, { "opacity": 1 }],
        { duration: 250, easing: "linear", fill: "forwards" }
      ]
    ],
    content: [
      [
        // Content fade in
        [{ "opacity": 0 }, { "opacity": 0, offset: 0.2 }, { "opacity": 1 }],
        { duration: 250, easing: "linear", fill: "forwards" }
      ]
    ],
    actions: [
      [
        // Actions fade in
        [{ "opacity": 0 }, { "opacity": 0, offset: 0.5 }, { "opacity": 1 }],
        { duration: 300, easing: "linear", fill: "forwards" }
      ]
    ]
  };
  var DIALOG_DEFAULT_CLOSE_ANIMATION = {
    dialog: [
      [
        // Dialog slide up
        [{ "transform": "translateY(0)" }, { "transform": "translateY(-50px)" }],
        { duration: 150, easing: EASING.EMPHASIZED_ACCELERATE }
      ]
    ],
    scrim: [
      [
        // Scrim fade out
        [{ "opacity": 0.32 }, { "opacity": 0 }],
        { duration: 150, easing: "linear" }
      ]
    ],
    container: [
      [
        // Container shrink
        [{ "height": "100%" }, { "height": "35%" }],
        {
          duration: 150,
          easing: EASING.EMPHASIZED_ACCELERATE,
          pseudoElement: "::before"
        }
      ],
      [
        // Container fade out
        [{ "opacity": "1" }, { "opacity": "0" }],
        { delay: 100, duration: 50, easing: "linear", pseudoElement: "::before" }
      ]
    ],
    headline: [
      [
        // Headline fade out
        [{ "opacity": 1 }, { "opacity": 0 }],
        { duration: 100, easing: "linear", fill: "forwards" }
      ]
    ],
    content: [
      [
        // Content fade out
        [{ "opacity": 1 }, { "opacity": 0 }],
        { duration: 100, easing: "linear", fill: "forwards" }
      ]
    ],
    actions: [
      [
        // Actions fade out
        [{ "opacity": 1 }, { "opacity": 0 }],
        { duration: 100, easing: "linear", fill: "forwards" }
      ]
    ]
  };

  // node_modules/@material/web/dialog/internal/dialog.js
  var dialogBaseClass = mixinDelegatesAria(i4);
  var Dialog = class extends dialogBaseClass {
    // We do not use `delegatesFocus: true` due to a Chromium bug with
    // selecting text.
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=950357
    /**
     * Opens the dialog when set to `true` and closes it when set to `false`.
     */
    get open() {
      return this.isOpen;
    }
    set open(open) {
      if (open === this.isOpen) {
        return;
      }
      this.isOpen = open;
      if (open) {
        this.setAttribute("open", "");
        this.show();
      } else {
        this.removeAttribute("open");
        this.close();
      }
    }
    constructor() {
      super();
      this.quick = false;
      this.returnValue = "";
      this.noFocusTrap = false;
      this.getOpenAnimation = () => DIALOG_DEFAULT_OPEN_ANIMATION;
      this.getCloseAnimation = () => DIALOG_DEFAULT_CLOSE_ANIMATION;
      this.isOpen = false;
      this.isOpening = false;
      this.isConnectedPromise = this.getIsConnectedPromise();
      this.isAtScrollTop = false;
      this.isAtScrollBottom = false;
      this.nextClickIsFromContent = false;
      this.hasHeadline = false;
      this.hasActions = false;
      this.hasIcon = false;
      this.escapePressedWithoutCancel = false;
      this.treewalker = o7 ? null : document.createTreeWalker(this, NodeFilter.SHOW_ELEMENT);
      if (!o7) {
        this.addEventListener("submit", this.handleSubmit);
      }
    }
    /**
     * Opens the dialog and fires a cancelable `open` event. After a dialog's
     * animation, an `opened` event is fired.
     *
     * Add an `autofocus` attribute to a child of the dialog that should
     * receive focus after opening.
     *
     * @return A Promise that resolves after the animation is finished and the
     *     `opened` event was fired.
     */
    async show() {
      this.isOpening = true;
      await this.isConnectedPromise;
      await this.updateComplete;
      const dialog = this.dialog;
      if (dialog.open || !this.isOpening) {
        this.isOpening = false;
        return;
      }
      const preventOpen = !this.dispatchEvent(new Event("open", { cancelable: true }));
      if (preventOpen) {
        this.open = false;
        this.isOpening = false;
        return;
      }
      dialog.showModal();
      this.open = true;
      if (this.scroller) {
        this.scroller.scrollTop = 0;
      }
      this.querySelector("[autofocus]")?.focus();
      await this.animateDialog(this.getOpenAnimation());
      this.dispatchEvent(new Event("opened"));
      this.isOpening = false;
    }
    /**
     * Closes the dialog and fires a cancelable `close` event. After a dialog's
     * animation, a `closed` event is fired.
     *
     * @param returnValue A return value usually indicating which button was used
     *     to close a dialog. If a dialog is canceled by clicking the scrim or
     *     pressing Escape, it will not change the return value after closing.
     * @return A Promise that resolves after the animation is finished and the
     *     `closed` event was fired.
     */
    async close(returnValue = this.returnValue) {
      this.isOpening = false;
      if (!this.isConnected) {
        this.open = false;
        return;
      }
      await this.updateComplete;
      const dialog = this.dialog;
      if (!dialog.open || this.isOpening) {
        this.open = false;
        return;
      }
      const prevReturnValue = this.returnValue;
      this.returnValue = returnValue;
      const preventClose = !this.dispatchEvent(new Event("close", { cancelable: true }));
      if (preventClose) {
        this.returnValue = prevReturnValue;
        return;
      }
      await this.animateDialog(this.getCloseAnimation());
      dialog.close(returnValue);
      this.open = false;
      this.dispatchEvent(new Event("closed"));
    }
    connectedCallback() {
      super.connectedCallback();
      this.isConnectedPromiseResolve();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.isConnectedPromise = this.getIsConnectedPromise();
    }
    render() {
      const scrollable = this.open && !(this.isAtScrollTop && this.isAtScrollBottom);
      const classes = {
        "has-headline": this.hasHeadline,
        "has-actions": this.hasActions,
        "has-icon": this.hasIcon,
        "scrollable": scrollable,
        "show-top-divider": scrollable && !this.isAtScrollTop,
        "show-bottom-divider": scrollable && !this.isAtScrollBottom
      };
      const showFocusTrap = this.open && !this.noFocusTrap;
      const focusTrap = x`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `;
      const { ariaLabel } = this;
      return x`
      <div class="scrim"></div>
      <dialog
        class=${e8(classes)}
        aria-label=${ariaLabel || E}
        aria-labelledby=${this.hasHeadline ? "headline" : E}
        role=${this.type === "alert" ? "alertdialog" : E}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue || E}>
        ${showFocusTrap ? focusTrap : E}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline || E}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${showFocusTrap ? focusTrap : E}
      </dialog>
    `;
    }
    firstUpdated() {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          this.handleAnchorIntersection(entry);
        }
      }, { root: this.scroller });
      this.intersectionObserver.observe(this.topAnchor);
      this.intersectionObserver.observe(this.bottomAnchor);
    }
    handleDialogClick() {
      if (this.nextClickIsFromContent) {
        this.nextClickIsFromContent = false;
        return;
      }
      const preventDefault = !this.dispatchEvent(new Event("cancel", { cancelable: true }));
      if (preventDefault) {
        return;
      }
      this.close();
    }
    handleContentClick() {
      this.nextClickIsFromContent = true;
    }
    handleSubmit(event) {
      const form = event.target;
      const { submitter } = event;
      if (form.getAttribute("method") !== "dialog" || !submitter) {
        return;
      }
      this.close(submitter.getAttribute("value") ?? this.returnValue);
    }
    handleCancel(event) {
      if (event.target !== this.dialog) {
        return;
      }
      this.escapePressedWithoutCancel = false;
      const preventDefault = !redispatchEvent(this, event);
      event.preventDefault();
      if (preventDefault) {
        return;
      }
      this.close();
    }
    handleClose() {
      if (!this.escapePressedWithoutCancel) {
        return;
      }
      this.escapePressedWithoutCancel = false;
      this.dialog?.dispatchEvent(new Event("cancel", { cancelable: true }));
    }
    handleKeydown(event) {
      if (event.key !== "Escape") {
        return;
      }
      this.escapePressedWithoutCancel = true;
      setTimeout(() => {
        this.escapePressedWithoutCancel = false;
      });
    }
    async animateDialog(animation) {
      this.cancelAnimations?.abort();
      this.cancelAnimations = new AbortController();
      if (this.quick) {
        return;
      }
      const { dialog, scrim, container, headline, content, actions } = this;
      if (!dialog || !scrim || !container || !headline || !content || !actions) {
        return;
      }
      const { container: containerAnimate, dialog: dialogAnimate, scrim: scrimAnimate, headline: headlineAnimate, content: contentAnimate, actions: actionsAnimate } = animation;
      const elementAndAnimation = [
        [dialog, dialogAnimate ?? []],
        [scrim, scrimAnimate ?? []],
        [container, containerAnimate ?? []],
        [headline, headlineAnimate ?? []],
        [content, contentAnimate ?? []],
        [actions, actionsAnimate ?? []]
      ];
      const animations = [];
      for (const [element, animation2] of elementAndAnimation) {
        for (const animateArgs of animation2) {
          const animation3 = element.animate(...animateArgs);
          this.cancelAnimations.signal.addEventListener("abort", () => {
            animation3.cancel();
          });
          animations.push(animation3);
        }
      }
      await Promise.all(animations.map((animation2) => animation2.finished.catch(() => {
      })));
    }
    handleHeadlineChange(event) {
      const slot = event.target;
      this.hasHeadline = slot.assignedElements().length > 0;
    }
    handleActionsChange(event) {
      const slot = event.target;
      this.hasActions = slot.assignedElements().length > 0;
    }
    handleIconChange(event) {
      const slot = event.target;
      this.hasIcon = slot.assignedElements().length > 0;
    }
    handleAnchorIntersection(entry) {
      const { target, isIntersecting } = entry;
      if (target === this.topAnchor) {
        this.isAtScrollTop = isIntersecting;
      }
      if (target === this.bottomAnchor) {
        this.isAtScrollBottom = isIntersecting;
      }
    }
    getIsConnectedPromise() {
      return new Promise((resolve) => {
        this.isConnectedPromiseResolve = resolve;
      });
    }
    handleFocusTrapFocus(event) {
      const [firstFocusableChild, lastFocusableChild] = this.getFirstAndLastFocusableChildren();
      if (!firstFocusableChild || !lastFocusableChild) {
        this.dialog?.focus();
        return;
      }
      const isFirstFocusTrap = event.target === this.firstFocusTrap;
      const isLastFocusTrap = !isFirstFocusTrap;
      const focusCameFromFirstChild = event.relatedTarget === firstFocusableChild;
      const focusCameFromLastChild = event.relatedTarget === lastFocusableChild;
      const focusCameFromOutsideDialog = !focusCameFromFirstChild && !focusCameFromLastChild;
      const shouldFocusFirstChild = isLastFocusTrap && focusCameFromLastChild || isFirstFocusTrap && focusCameFromOutsideDialog;
      if (shouldFocusFirstChild) {
        firstFocusableChild.focus();
        return;
      }
      const shouldFocusLastChild = isFirstFocusTrap && focusCameFromFirstChild || isLastFocusTrap && focusCameFromOutsideDialog;
      if (shouldFocusLastChild) {
        lastFocusableChild.focus();
        return;
      }
    }
    getFirstAndLastFocusableChildren() {
      if (!this.treewalker) {
        return [null, null];
      }
      let firstFocusableChild = null;
      let lastFocusableChild = null;
      this.treewalker.currentNode = this.treewalker.root;
      while (this.treewalker.nextNode()) {
        const nextChild = this.treewalker.currentNode;
        if (!isFocusable2(nextChild)) {
          continue;
        }
        if (!firstFocusableChild) {
          firstFocusableChild = nextChild;
        }
        lastFocusableChild = nextChild;
      }
      return [firstFocusableChild, lastFocusableChild];
    }
  };
  __decorate([
    n3({ type: Boolean })
  ], Dialog.prototype, "open", null);
  __decorate([
    n3({ type: Boolean })
  ], Dialog.prototype, "quick", void 0);
  __decorate([
    n3({ attribute: false })
  ], Dialog.prototype, "returnValue", void 0);
  __decorate([
    n3()
  ], Dialog.prototype, "type", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "no-focus-trap" })
  ], Dialog.prototype, "noFocusTrap", void 0);
  __decorate([
    e4("dialog")
  ], Dialog.prototype, "dialog", void 0);
  __decorate([
    e4(".scrim")
  ], Dialog.prototype, "scrim", void 0);
  __decorate([
    e4(".container")
  ], Dialog.prototype, "container", void 0);
  __decorate([
    e4(".headline")
  ], Dialog.prototype, "headline", void 0);
  __decorate([
    e4(".content")
  ], Dialog.prototype, "content", void 0);
  __decorate([
    e4(".actions")
  ], Dialog.prototype, "actions", void 0);
  __decorate([
    r4()
  ], Dialog.prototype, "isAtScrollTop", void 0);
  __decorate([
    r4()
  ], Dialog.prototype, "isAtScrollBottom", void 0);
  __decorate([
    e4(".scroller")
  ], Dialog.prototype, "scroller", void 0);
  __decorate([
    e4(".top.anchor")
  ], Dialog.prototype, "topAnchor", void 0);
  __decorate([
    e4(".bottom.anchor")
  ], Dialog.prototype, "bottomAnchor", void 0);
  __decorate([
    e4(".focus-trap")
  ], Dialog.prototype, "firstFocusTrap", void 0);
  __decorate([
    r4()
  ], Dialog.prototype, "hasHeadline", void 0);
  __decorate([
    r4()
  ], Dialog.prototype, "hasActions", void 0);
  __decorate([
    r4()
  ], Dialog.prototype, "hasIcon", void 0);
  function isFocusable2(element) {
    const knownFocusableElements = ":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])";
    const notDisabled = ":not(:disabled,[disabled])";
    const notNegativeTabIndex = ':not([tabindex^="-"])';
    if (element.matches(knownFocusableElements + notDisabled + notNegativeTabIndex)) {
      return true;
    }
    const isCustomElement = element.localName.includes("-");
    if (!isCustomElement) {
      return false;
    }
    if (!element.matches(notDisabled)) {
      return false;
    }
    return element.shadowRoot?.delegatesFocus ?? false;
  }

  // node_modules/@material/web/dialog/internal/dialog-styles.js
  var styles28 = i`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;

  // node_modules/@material/web/dialog/dialog.js
  var MdDialog = class MdDialog2 extends Dialog {
  };
  MdDialog.styles = [styles28];
  MdDialog = __decorate([
    t("md-dialog")
  ], MdDialog);

  // node_modules/@material/web/slider/internal/forced-colors-styles.js
  var styles29 = i`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}
`;

  // node_modules/lit-html/directives/when.js
  function n9(n10, r11, t6) {
    return n10 ? r11(n10) : t6?.(n10);
  }

  // node_modules/@material/web/slider/internal/slider.js
  var sliderBaseClass = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(i4)));
  var Slider = class extends sliderBaseClass {
    /**
     * The HTML name to use in form submission for a range slider's starting
     * value. Use `name` instead if both the start and end values should use the
     * same name.
     */
    get nameStart() {
      return this.getAttribute("name-start") ?? this.name;
    }
    set nameStart(name) {
      this.setAttribute("name-start", name);
    }
    /**
     * The HTML name to use in form submission for a range slider's ending value.
     * Use `name` instead if both the start and end values should use the same
     * name.
     */
    get nameEnd() {
      return this.getAttribute("name-end") ?? this.nameStart;
    }
    set nameEnd(name) {
      this.setAttribute("name-end", name);
    }
    // Note: start aria-* properties are only applied when range=true, which is
    // why they do not need to handle both cases.
    get renderAriaLabelStart() {
      const { ariaLabel } = this;
      return this.ariaLabelStart || ariaLabel && `${ariaLabel} start` || this.valueLabelStart || String(this.valueStart);
    }
    get renderAriaValueTextStart() {
      return this.ariaValueTextStart || this.valueLabelStart || String(this.valueStart);
    }
    // Note: end aria-* properties are applied for single and range sliders, which
    // is why it needs to handle `this.range` (while start aria-* properties do
    // not).
    get renderAriaLabelEnd() {
      const { ariaLabel } = this;
      if (this.range) {
        return this.ariaLabelEnd || ariaLabel && `${ariaLabel} end` || this.valueLabelEnd || String(this.valueEnd);
      }
      return ariaLabel || this.valueLabel || String(this.value);
    }
    get renderAriaValueTextEnd() {
      if (this.range) {
        return this.ariaValueTextEnd || this.valueLabelEnd || String(this.valueEnd);
      }
      const { ariaValueText } = this;
      return ariaValueText || this.valueLabel || String(this.value);
    }
    constructor() {
      super();
      this.min = 0;
      this.max = 100;
      this.valueLabel = "";
      this.valueLabelStart = "";
      this.valueLabelEnd = "";
      this.ariaLabelStart = "";
      this.ariaValueTextStart = "";
      this.ariaLabelEnd = "";
      this.ariaValueTextEnd = "";
      this.step = 1;
      this.ticks = false;
      this.labeled = false;
      this.range = false;
      this.handleStartHover = false;
      this.handleEndHover = false;
      this.startOnTop = false;
      this.handlesOverlapping = false;
      this.ripplePointerId = 1;
      this.isRedispatchingEvent = false;
      if (!o7) {
        this.addEventListener("click", (event) => {
          if (!isActivationClick(event) || !this.inputEnd) {
            return;
          }
          this.focus();
          dispatchActivationClick(this.inputEnd);
        });
      }
    }
    focus() {
      this.inputEnd?.focus();
    }
    willUpdate(changed) {
      this.renderValueStart = changed.has("valueStart") ? this.valueStart : this.inputStart?.valueAsNumber;
      const endValueChanged = changed.has("valueEnd") && this.range || changed.has("value");
      this.renderValueEnd = endValueChanged ? this.range ? this.valueEnd : this.value : this.inputEnd?.valueAsNumber;
      if (changed.get("handleStartHover") !== void 0) {
        this.toggleRippleHover(this.rippleStart, this.handleStartHover);
      } else if (changed.get("handleEndHover") !== void 0) {
        this.toggleRippleHover(this.rippleEnd, this.handleEndHover);
      }
    }
    updated(changed) {
      if (this.range) {
        this.renderValueStart = this.inputStart.valueAsNumber;
      }
      this.renderValueEnd = this.inputEnd.valueAsNumber;
      if (this.range) {
        const segment = (this.max - this.min) / 3;
        if (this.valueStart === void 0) {
          this.inputStart.valueAsNumber = this.min + segment;
          const v2 = this.inputStart.valueAsNumber;
          this.valueStart = this.renderValueStart = v2;
        }
        if (this.valueEnd === void 0) {
          this.inputEnd.valueAsNumber = this.min + 2 * segment;
          const v2 = this.inputEnd.valueAsNumber;
          this.valueEnd = this.renderValueEnd = v2;
        }
      } else {
        this.value ??= this.renderValueEnd;
      }
      if (changed.has("range") || changed.has("renderValueStart") || changed.has("renderValueEnd") || this.isUpdatePending) {
        const startNub = this.handleStart?.querySelector(".handleNub");
        const endNub = this.handleEnd?.querySelector(".handleNub");
        this.handlesOverlapping = isOverlapping(startNub, endNub);
      }
      this.performUpdate();
    }
    render() {
      const step = this.step === 0 ? 1 : this.step;
      const range = Math.max(this.max - this.min, step);
      const startFraction = this.range ? ((this.renderValueStart ?? this.min) - this.min) / range : 0;
      const endFraction = ((this.renderValueEnd ?? this.min) - this.min) / range;
      const containerStyles = {
        // for clipping inputs and active track.
        "--_start-fraction": String(startFraction),
        "--_end-fraction": String(endFraction),
        // for generating tick marks
        "--_tick-count": String(range / step)
      };
      const containerClasses = { ranged: this.range };
      const labelStart = this.valueLabelStart || String(this.renderValueStart);
      const labelEnd = (this.range ? this.valueLabelEnd : this.valueLabel) || String(this.renderValueEnd);
      const inputStartProps = {
        start: true,
        value: this.renderValueStart,
        ariaLabel: this.renderAriaLabelStart,
        ariaValueText: this.renderAriaValueTextStart,
        ariaMin: this.min,
        ariaMax: this.valueEnd ?? this.max
      };
      const inputEndProps = {
        start: false,
        value: this.renderValueEnd,
        ariaLabel: this.renderAriaLabelEnd,
        ariaValueText: this.renderAriaValueTextEnd,
        ariaMin: this.range ? this.valueStart ?? this.min : this.min,
        ariaMax: this.max
      };
      const handleStartProps = {
        start: true,
        hover: this.handleStartHover,
        label: labelStart
      };
      const handleEndProps = {
        start: false,
        hover: this.handleEndHover,
        label: labelEnd
      };
      const handleContainerClasses = {
        hover: this.handleStartHover || this.handleEndHover
      };
      return x` <div
      class="container ${e8(containerClasses)}"
      style=${o12(containerStyles)}>
      ${n9(this.range, () => this.renderInput(inputStartProps))}
      ${this.renderInput(inputEndProps)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${e8(handleContainerClasses)}">
            ${n9(this.range, () => this.renderHandle(handleStartProps))}
            ${this.renderHandle(handleEndProps)}
          </div>
        </div>
      </div>
    </div>`;
    }
    renderTrack() {
      return x`
      <div class="track"></div>
      ${this.ticks ? x`<div class="tickmarks"></div>` : E}
    `;
    }
    renderLabel(value) {
      return x`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${value}</span>
    </div>`;
    }
    renderHandle({ start, hover, label }) {
      const onTop = !this.disabled && start === this.startOnTop;
      const isOverlapping2 = !this.disabled && this.handlesOverlapping;
      const name = start ? "start" : "end";
      return x`<div
      class="handle ${e8({
        [name]: true,
        hover,
        onTop,
        isOverlapping: isOverlapping2
      })}">
      <md-focus-ring part="focus-ring" for=${name}></md-focus-ring>
      <md-ripple
        for=${name}
        class=${name}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub">
        <md-elevation part="elevation"></md-elevation>
      </div>
      ${n9(this.labeled, () => this.renderLabel(label))}
    </div>`;
    }
    renderInput({ start, value, ariaLabel, ariaValueText, ariaMin, ariaMax }) {
      const name = start ? `start` : `end`;
      return x`<input
      type="range"
      class="${e8({
        start,
        end: !start
      })}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${name}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${ariaMin}
      .max=${String(this.max)}
      aria-valuemax=${ariaMax}
      .step=${String(this.step)}
      .value=${String(value)}
      .tabIndex=${start ? 1 : 0}
      aria-label=${ariaLabel || E}
      aria-valuetext=${ariaValueText} />`;
    }
    async toggleRippleHover(ripple, hovering) {
      const rippleEl = await ripple;
      if (!rippleEl) {
        return;
      }
      if (hovering) {
        rippleEl.handlePointerenter(new PointerEvent("pointerenter", {
          isPrimary: true,
          pointerId: this.ripplePointerId
        }));
      } else {
        rippleEl.handlePointerleave(new PointerEvent("pointerleave", {
          isPrimary: true,
          pointerId: this.ripplePointerId
        }));
      }
    }
    handleFocus(event) {
      this.updateOnTop(event.target);
    }
    startAction(event) {
      const target = event.target;
      const fixed = target === this.inputStart ? this.inputEnd : this.inputStart;
      this.action = {
        canFlip: event.type === "pointerdown",
        flipped: false,
        target,
        fixed,
        values: /* @__PURE__ */ new Map([
          [target, target.valueAsNumber],
          [fixed, fixed?.valueAsNumber]
        ])
      };
    }
    finishAction(event) {
      this.action = void 0;
    }
    handleKeydown(event) {
      this.startAction(event);
    }
    handleKeyup(event) {
      this.finishAction(event);
    }
    handleDown(event) {
      this.startAction(event);
      this.ripplePointerId = event.pointerId;
      const isStart = event.target === this.inputStart;
      this.handleStartHover = !this.disabled && isStart && Boolean(this.handleStart);
      this.handleEndHover = !this.disabled && !isStart && Boolean(this.handleEnd);
    }
    async handleUp(event) {
      if (!this.action) {
        return;
      }
      const { target, values, flipped } = this.action;
      await new Promise(requestAnimationFrame);
      if (target !== void 0) {
        target.focus();
        if (flipped && target.valueAsNumber !== values.get(target)) {
          target.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      this.finishAction(event);
    }
    /**
     * The move handler tracks handle hovering to facilitate proper ripple
     * behavior on the slider handle. This is needed because user interaction with
     * the native input is leveraged to position the handle. Because the separate
     * displayed handle element has pointer events disabled (to allow interaction
     * with the input) and the input's handle is a pseudo-element, neither can be
     * the ripple's interactive element. Therefore the input is the ripple's
     * interactive element and has a `ripple` directive; however the ripple
     * is gated on the handle being hovered. In addition, because the ripple
     * hover state is being specially handled, it must be triggered independent
     * of the directive. This is done based on the hover state when the
     * slider is updated.
     */
    handleMove(event) {
      this.handleStartHover = !this.disabled && inBounds(event, this.handleStart);
      this.handleEndHover = !this.disabled && inBounds(event, this.handleEnd);
    }
    handleEnter(event) {
      this.handleMove(event);
    }
    handleLeave() {
      this.handleStartHover = false;
      this.handleEndHover = false;
    }
    updateOnTop(input) {
      this.startOnTop = input.classList.contains("start");
    }
    needsClamping() {
      if (!this.action) {
        return false;
      }
      const { target, fixed } = this.action;
      const isStart = target === this.inputStart;
      return isStart ? target.valueAsNumber > fixed.valueAsNumber : target.valueAsNumber < fixed.valueAsNumber;
    }
    // if start/end start coincident and the first drag input would e.g. move
    // start > end, avoid clamping and "flip" to use the other input
    // as the action target.
    isActionFlipped() {
      const { action } = this;
      if (!action) {
        return false;
      }
      const { target, fixed, values } = action;
      if (action.canFlip) {
        const coincident = values.get(target) === values.get(fixed);
        if (coincident && this.needsClamping()) {
          action.canFlip = false;
          action.flipped = true;
          action.target = fixed;
          action.fixed = target;
        }
      }
      return action.flipped;
    }
    // when flipped, apply the drag input to the flipped target and reset
    // the actual target.
    flipAction() {
      if (!this.action) {
        return false;
      }
      const { target, fixed, values } = this.action;
      const changed = target.valueAsNumber !== fixed.valueAsNumber;
      target.valueAsNumber = fixed.valueAsNumber;
      fixed.valueAsNumber = values.get(fixed);
      return changed;
    }
    // clamp such that start does not move beyond end and visa versa.
    clampAction() {
      if (!this.needsClamping() || !this.action) {
        return false;
      }
      const { target, fixed } = this.action;
      target.valueAsNumber = fixed.valueAsNumber;
      return true;
    }
    handleInput(event) {
      if (this.isRedispatchingEvent) {
        return;
      }
      let stopPropagation = false;
      let redispatch = false;
      if (this.range) {
        if (this.isActionFlipped()) {
          stopPropagation = true;
          redispatch = this.flipAction();
        }
        if (this.clampAction()) {
          stopPropagation = true;
          redispatch = false;
        }
      }
      const target = event.target;
      this.updateOnTop(target);
      if (this.range) {
        this.valueStart = this.inputStart.valueAsNumber;
        this.valueEnd = this.inputEnd.valueAsNumber;
      } else {
        this.value = this.inputEnd.valueAsNumber;
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
      if (redispatch) {
        this.isRedispatchingEvent = true;
        redispatchEvent(target, event);
        this.isRedispatchingEvent = false;
      }
    }
    handleChange(event) {
      const changeTarget = event.target;
      const { target, values } = this.action ?? {};
      const squelch = target && target.valueAsNumber === values.get(changeTarget);
      if (!squelch) {
        redispatchEvent(this, event);
      }
      this.finishAction(event);
    }
    [getFormValue]() {
      if (this.range) {
        const data = new FormData();
        data.append(this.nameStart, String(this.valueStart));
        data.append(this.nameEnd, String(this.valueEnd));
        return data;
      }
      return String(this.value);
    }
    formResetCallback() {
      if (this.range) {
        const valueStart = this.getAttribute("value-start");
        this.valueStart = valueStart !== null ? Number(valueStart) : void 0;
        const valueEnd = this.getAttribute("value-end");
        this.valueEnd = valueEnd !== null ? Number(valueEnd) : void 0;
        return;
      }
      const value = this.getAttribute("value");
      this.value = value !== null ? Number(value) : void 0;
    }
    formStateRestoreCallback(state) {
      if (Array.isArray(state)) {
        const [[, valueStart], [, valueEnd]] = state;
        this.valueStart = Number(valueStart);
        this.valueEnd = Number(valueEnd);
        this.range = true;
        return;
      }
      this.value = Number(state);
      this.range = false;
    }
  };
  Slider.shadowRootOptions = {
    ...i4.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Number })
  ], Slider.prototype, "min", void 0);
  __decorate([
    n3({ type: Number })
  ], Slider.prototype, "max", void 0);
  __decorate([
    n3({ type: Number })
  ], Slider.prototype, "value", void 0);
  __decorate([
    n3({ type: Number, attribute: "value-start" })
  ], Slider.prototype, "valueStart", void 0);
  __decorate([
    n3({ type: Number, attribute: "value-end" })
  ], Slider.prototype, "valueEnd", void 0);
  __decorate([
    n3({ attribute: "value-label" })
  ], Slider.prototype, "valueLabel", void 0);
  __decorate([
    n3({ attribute: "value-label-start" })
  ], Slider.prototype, "valueLabelStart", void 0);
  __decorate([
    n3({ attribute: "value-label-end" })
  ], Slider.prototype, "valueLabelEnd", void 0);
  __decorate([
    n3({ attribute: "aria-label-start" })
  ], Slider.prototype, "ariaLabelStart", void 0);
  __decorate([
    n3({ attribute: "aria-valuetext-start" })
  ], Slider.prototype, "ariaValueTextStart", void 0);
  __decorate([
    n3({ attribute: "aria-label-end" })
  ], Slider.prototype, "ariaLabelEnd", void 0);
  __decorate([
    n3({ attribute: "aria-valuetext-end" })
  ], Slider.prototype, "ariaValueTextEnd", void 0);
  __decorate([
    n3({ type: Number })
  ], Slider.prototype, "step", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Slider.prototype, "ticks", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Slider.prototype, "labeled", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Slider.prototype, "range", void 0);
  __decorate([
    e4("input.start")
  ], Slider.prototype, "inputStart", void 0);
  __decorate([
    e4(".handle.start")
  ], Slider.prototype, "handleStart", void 0);
  __decorate([
    r6("md-ripple.start")
  ], Slider.prototype, "rippleStart", void 0);
  __decorate([
    e4("input.end")
  ], Slider.prototype, "inputEnd", void 0);
  __decorate([
    e4(".handle.end")
  ], Slider.prototype, "handleEnd", void 0);
  __decorate([
    r6("md-ripple.end")
  ], Slider.prototype, "rippleEnd", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "handleStartHover", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "handleEndHover", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "startOnTop", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "handlesOverlapping", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "renderValueStart", void 0);
  __decorate([
    r4()
  ], Slider.prototype, "renderValueEnd", void 0);
  function inBounds({ x: x2, y: y3 }, element) {
    if (!element) {
      return false;
    }
    const { top, left, bottom, right } = element.getBoundingClientRect();
    return x2 >= left && x2 <= right && y3 >= top && y3 <= bottom;
  }
  function isOverlapping(elA, elB) {
    if (!(elA && elB)) {
      return false;
    }
    const a4 = elA.getBoundingClientRect();
    const b3 = elB.getBoundingClientRect();
    return !(a4.top > b3.bottom || a4.right < b3.left || a4.bottom < b3.top || a4.left > b3.right);
  }

  // node_modules/@material/web/slider/internal/slider-styles.js
  var styles30 = i`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}
`;

  // node_modules/@material/web/slider/slider.js
  var MdSlider = class MdSlider2 extends Slider {
  };
  MdSlider.styles = [styles30, styles29];
  MdSlider = __decorate([
    t("md-slider")
  ], MdSlider);

  // src/pv-expand-keypad.ts
  var CharacterSelectEvent = class extends CustomEvent {
  };
  var PvExpandKeypadElement = class extends i4 {
    constructor() {
      super(...arguments);
      this.label = "";
      this.value = [];
      this.open = false;
      this.expandAtOrigin = false;
      this.numCharsOnHandler = 3;
      this.onKeydownWhileOpenWithThis = this.onKeydownWhileOpen.bind(this);
    }
    /**
     * Traps the focus within the expanded keypad.
     * @param e A keydown event
     */
    onKeydownWhileOpen(e10) {
      if (e10.key === "Escape") {
        this.open = false;
        return;
      }
      if (e10.key === "Tab" && this.shadowRoot && this.focusibleButtons) {
        const activeElement = this.shadowRoot.activeElement;
        if (e10.shiftKey && activeElement === this.focusibleButtons[0]) {
          this.focusibleButtons[this.focusibleButtons.length - 1].focus();
          e10.preventDefault();
        } else if (!e10.shiftKey && activeElement === this.focusibleButtons[this.focusibleButtons.length - 1]) {
          this.focusibleButtons[0].focus();
          e10.preventDefault();
        }
      }
    }
    onKeypadOpen() {
      if (!this.container) return;
      if (!this.expandedKeypadRows) return;
      if (!this.handlerButton) return;
      if (this.expandAtOrigin) {
        this.container.style.position = "absolute";
        this.container.style.top = "0";
        this.container.style.left = "0";
        this.expandedKeypadRows.forEach((row) => {
          row.style.transform = "none";
        });
      } else {
        const handlerBBox = this.handlerButton.getBoundingClientRect();
        this.container.style.position = "fixed";
        this.container.style.top = `${handlerBBox?.top}px`;
        this.container.style.left = `${handlerBBox?.left}px`;
        this.expandedKeypadRows.forEach((row) => {
          row.style.transform = "";
          const rowBBox = row.getBoundingClientRect();
          if (rowBBox.right > window.innerWidth) {
            row.style.transform = `translateX(${window.innerWidth - rowBBox.right - 16}px)`;
          }
        });
      }
      this.firstKeypad?.focus();
      this.addEventListener("keydown", this.onKeydownWhileOpenWithThis);
      this.dispatchEvent(
        new Event("keypad-open", {
          bubbles: true,
          composed: true
        })
      );
    }
    onKeypadClose() {
      this.removeEventListener("keydown", this.onKeydownWhileOpenWithThis);
      this.handlerButton?.focus();
    }
    firstUpdated() {
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.handlerButton) return;
        const width = this.handlerButton.getBoundingClientRect().width;
        this.allButtons?.forEach((button) => {
          if (button !== this.handlerButton) button.style.width = `${width}px`;
          button.style.fontSize = `${width / this.numCharsOnHandler}px`;
        });
      });
      this.resizeObserver.observe(this.handlerButton);
    }
    updated(changedProperties) {
      const oldOpenValue = changedProperties.get("open");
      if (oldOpenValue === true) {
        this.onKeypadClose();
      } else if (oldOpenValue === false) {
        this.onKeypadOpen();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.resizeObserver?.disconnect();
    }
    render() {
      return x`<button
        class="handler"
        @click="${() => {
        this.open = true;
        this.dispatchEvent(
          new CharacterSelectEvent("keypad-handler-click", {
            detail: "open",
            bubbles: true,
            composed: true
          })
        );
      }}"
      >
        ${this.label}
      </button>
      <ul class="container">
        <button
          class="close"
          @click="${() => {
        this.open = false;
        this.dispatchEvent(
          new CharacterSelectEvent("keypad-handler-click", {
            detail: "close",
            bubbles: true,
            composed: true
          })
        );
      }}"
        >
          close
        </button>
        ${this.value.map(
        (row) => x`<li>
              <ul class="row">
                ${Array.from(row).map(
          (c6) => x`<li>
                      <button
                        @click="${() => {
            this.open = false;
            const characterToSend = c6.replace("\u2423", " ");
            this.dispatchEvent(
              new CharacterSelectEvent("character-select", {
                detail: characterToSend,
                bubbles: true,
                composed: true
              })
            );
          }}"
                      >
                        ${c6}
                      </button>
                    </li>`
        )}
              </ul>
            </li>`
      )}
      </ul>
      <div
        class="backdrop"
        @click="${() => {
        this.open = false;
      }}"
      ></div>`;
    }
  };
  PvExpandKeypadElement.styles = i`
    button {
      align-items: center;
      aspect-ratio: 1;
      background: var(--color-surface, white);
      border-radius: 20%;
      border: solid 3px #81c995;
      color: var(--color-on-surface);
      cursor: pointer;
      display: flex;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      justify-content: center;
      max-width: 8rem;
      min-width: 2rem;
      padding: 0;
      width: 100%;
    }

    button:hover,
    button:focus {
      background: var(--color-primary, yellow);
    }

    .close {
      font-family: 'Material Symbols Outlined';
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ul.container {
      display: none;
      left: 0;
      position: absolute;
      top: 0;
      z-index: 1000;
    }

    :host([open]) ul.container {
      display: block;
    }

    ul.row {
      display: flex;
      gap: 0.5rem;
    }

    ul button {
      margin-bottom: 0.5rem;
    }

    .backdrop {
      background: rgba(0, 0, 0, 0.5);
      display: none;
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
    }

    :host([open]) .backdrop {
      display: block;
    }
  `;
  __decorateClass([
    n3({ type: String, reflect: true })
  ], PvExpandKeypadElement.prototype, "label", 2);
  __decorateClass([
    n3({ type: Array })
  ], PvExpandKeypadElement.prototype, "value", 2);
  __decorateClass([
    n3({ type: Boolean, reflect: true })
  ], PvExpandKeypadElement.prototype, "open", 2);
  __decorateClass([
    n3({ type: Boolean, reflect: true })
  ], PvExpandKeypadElement.prototype, "expandAtOrigin", 2);
  __decorateClass([
    n3({ type: Number })
  ], PvExpandKeypadElement.prototype, "numCharsOnHandler", 2);
  __decorateClass([
    r5("button")
  ], PvExpandKeypadElement.prototype, "allButtons", 2);
  __decorateClass([
    e4("button.handler")
  ], PvExpandKeypadElement.prototype, "handlerButton", 2);
  __decorateClass([
    e4("ul.container")
  ], PvExpandKeypadElement.prototype, "container", 2);
  __decorateClass([
    r5("ul.container button")
  ], PvExpandKeypadElement.prototype, "focusibleButtons", 2);
  __decorateClass([
    e4("li button")
  ], PvExpandKeypadElement.prototype, "firstKeypad", 2);
  __decorateClass([
    r5("ul.row")
  ], PvExpandKeypadElement.prototype, "expandedKeypadRows", 2);
  PvExpandKeypadElement = __decorateClass([
    t("pv-expand-keypad")
  ], PvExpandKeypadElement);

  // src/keyboards/pv-single-row-keyboard.ts
  var ALPHANUMERIC_SINGLE_ROW_KEYGRID = [
    [
      { label: "abc", value: ["abc"] },
      { label: "def", value: ["def"] },
      { label: "ghi", value: ["ghi"] },
      { label: "jkl", value: ["jkl"] },
      { label: "mno", value: ["mno"] },
      { label: "pqrs", value: ["pqrs"] },
      { label: "tuv", value: ["tuv"] },
      { label: "wxyz", value: ["wxyz"] },
      { label: "0~9", value: ["01234", "56789"] },
      { label: ".,!?", value: ["\u2423.,!?"] }
    ]
  ];
  var HIRAGANA_SINGLE_ROW_KEYGRID = [
    [
      { label: "\u3042", value: ["\u3042\u3044\u3046\u3048\u304A", "\u3041\u3043\u3045\u3047\u3049"] },
      { label: "\u304B", value: ["\u304B\u304D\u304F\u3051\u3053", "\u304C\u304E\u3050\u3052\u3054"] },
      { label: "\u3055", value: ["\u3055\u3057\u3059\u305B\u305D", "\u3056\u3058\u305A\u305C\u305E"] },
      { label: "\u305F", value: ["\u305F\u3061\u3064\u3066\u3068\u3063", "\u3060\u3062\u3065\u3067\u3069"] },
      { label: "\u306A", value: ["\u306A\u306B\u306C\u306D\u306E"] },
      { label: "\u306F", value: ["\u306F\u3072\u3075\u3078\u307B", "\u3070\u3073\u3076\u3079\u307C", "\u3071\u3074\u3077\u307A\u307D"] },
      { label: "\u307E", value: ["\u307E\u307F\u3080\u3081\u3082"] },
      { label: "\u3084", value: ["\u3084\u3086\u3088", "\u3083\u3085\u3087"] },
      { label: "\u3089", value: ["\u3089\u308A\u308B\u308C\u308D"] },
      { label: "\u308F", value: ["\u308F\u3092\u3093"] },
      { label: "\u309B\u309C", value: ["\u3002\u3001\u30FC\uFF1F\uFF01", "\u2423\u309B\u309C"] }
    ]
  ];
  var FRENCH_SINGLE_ROW_KEYGRID = [
    [
      { label: "abc", value: ["abc", "\xE0\xE2\xE7"] },
      { label: "def", value: ["def", "\xE8\xE9\xEA\xEB"] },
      { label: "ghi", value: ["ghi", "\xEE\xEF"] },
      { label: "jkl", value: ["jkl"] },
      { label: "mno", value: ["mno", "\xF4\u0153"] },
      { label: "pqrs", value: ["pqrs"] },
      { label: "tuv", value: ["tuv", "\xF9\xFB\xFC"] },
      { label: "wxyz", value: ["wxyz", "\xFF"] },
      { label: "0~9", value: ["01234", "56789"] },
      { label: ".,!?", value: ["\u2423.,!?"] }
    ]
  ];
  var GERMAN_SINGLE_ROW_KEYGRID = [
    [
      { label: "abc", value: ["abc", "\xE4"] },
      { label: "def", value: ["def"] },
      { label: "ghi", value: ["ghi"] },
      { label: "jkl", value: ["jkl"] },
      { label: "mno", value: ["mno", "\xF6"] },
      { label: "pqrs", value: ["pqrs"] },
      { label: "tuv", value: ["tuv", "\xFC"] },
      { label: "wxyz", value: ["wxyz"] },
      { label: "0~9", value: ["01234", "56789"] },
      { label: ".,!?", value: ["\u2423.,!?"] }
    ]
  ];
  var SWEDISH_SINGLE_ROW_KEYGRID = [
    [
      { label: "abc", value: ["abc", "\xE5\xE4"] },
      { label: "def", value: ["def"] },
      { label: "ghi", value: ["ghi"] },
      { label: "jkl", value: ["jkl"] },
      { label: "mno", value: ["mno", "\xF6"] },
      { label: "pqrs", value: ["pqrs"] },
      { label: "tuv", value: ["tuv", "\xFC"] },
      { label: "wxyz", value: ["wxyz"] },
      { label: "0~9", value: ["01234", "56789"] },
      { label: ".,!?", value: ["\u2423.,!?"] }
    ]
  ];
  var PvSingleRowKeyboard = class extends i4 {
    constructor(keygrid) {
      super();
      this.keygrid = keygrid;
    }
    static {
      this.styles = i`
    :host {
      position: relative;
    }

    ul {
      display: flex;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      flex: 1;
      max-width: 9rem;
    }
  `;
    }
    firstUpdated() {
      this.addEventListener("keypad-open", (e10) => {
        const target = e10.composedPath()[0];
        this.keypads?.forEach((keypad) => {
          keypad.open = keypad === target;
        });
      });
    }
    render() {
      return this.keygrid.map(
        (keys) => x`
        <ul>
          ${keys.map(
          (keypad) => x`
              <li>
                <pv-expand-keypad
                  .label=${keypad.label}
                  .value=${keypad.value}
                  ?expandAtOrigin=${this.state?.expandAtOrigin || false}
                ></pv-expand-keypad>
              </li>
            `
        )}
        </ul>
      `
      );
    }
  };
  __decorateClass([
    n3({ type: Object })
  ], PvSingleRowKeyboard.prototype, "state", 2);
  __decorateClass([
    r5("pv-expand-keypad")
  ], PvSingleRowKeyboard.prototype, "keypads", 2);
  var PvAlphanumericSingleRowKeyboard = class extends PvSingleRowKeyboard {
    constructor() {
      super(ALPHANUMERIC_SINGLE_ROW_KEYGRID);
    }
  };
  PvAlphanumericSingleRowKeyboard = __decorateClass([
    t("pv-alphanumeric-single-row-keyboard")
  ], PvAlphanumericSingleRowKeyboard);
  var PvHiraganaSingleRowKeyboard = class extends PvSingleRowKeyboard {
    constructor() {
      super(HIRAGANA_SINGLE_ROW_KEYGRID);
    }
  };
  PvHiraganaSingleRowKeyboard = __decorateClass([
    t("pv-hiragana-single-row-keyboard")
  ], PvHiraganaSingleRowKeyboard);
  var PvFrenchSingleRowKeyboard = class extends PvSingleRowKeyboard {
    constructor() {
      super(FRENCH_SINGLE_ROW_KEYGRID);
    }
  };
  PvFrenchSingleRowKeyboard = __decorateClass([
    t("pv-french-single-row-keyboard")
  ], PvFrenchSingleRowKeyboard);
  var PvGermanSingleRowKeyboard = class extends PvSingleRowKeyboard {
    constructor() {
      super(GERMAN_SINGLE_ROW_KEYGRID);
    }
  };
  PvGermanSingleRowKeyboard = __decorateClass([
    t("pv-german-single-row-keyboard")
  ], PvGermanSingleRowKeyboard);
  var PvSwedishSingleRowKeyboard = class extends PvSingleRowKeyboard {
    constructor() {
      super(SWEDISH_SINGLE_ROW_KEYGRID);
    }
  };
  PvSwedishSingleRowKeyboard = __decorateClass([
    t("pv-swedish-single-row-keyboard")
  ], PvSwedishSingleRowKeyboard);

  // src/keyboards/pv-qwerty-keyboard.ts
  var KEYS = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", "?", "!"],
    [",", " ", "."]
  ];
  var PvQwertyKeyboard = class extends i4 {
    render() {
      return x`<div class="container">
      ${KEYS.map(
        (row, i9) => x`<div class="row ${i9 % 2 === 0 ? "even" : "odd"}">
            ${row.map(
          (key) => x`<button
                  @click=${() => {
            this.dispatchEvent(
              new CustomEvent("character-select", {
                detail: key,
                bubbles: true,
                composed: true
              })
            );
          }}
                >
                  ${key}
                </button>`
        )}
          </div>`
      )}
    </div>`;
    }
  };
  PvQwertyKeyboard.styles = i`
    .container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    button {
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      flex: 1;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: min(4vh, 1.5rem);
      min-width: 2em;
      padding: 0.5rem 1rem;
      text-align: center;
    }

    .row {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .row.odd button {
      background: var(--color-secondary);
    }

    .row button:focus,
    .row button:hover {
      background: var(--color-primary, yellow);
    }
  `;
  PvQwertyKeyboard = __decorateClass([
    t("pv-qwerty-keyboard")
  ], PvQwertyKeyboard);

  // src/keyboards/pv-fifty-key-keyboard.ts
  var SMALL_KANA_TRIGGER = String.fromCodePoint(61440);
  var STEGANA = /* @__PURE__ */ new Map([
    ["\u3042", "\u3041"],
    ["\u3044", "\u3043"],
    ["\u3046", "\u3045"],
    ["\u3048", "\u3047"],
    ["\u304A", "\u3049"],
    ["\u3064", "\u3063"],
    ["\u3084", "\u3083"],
    ["\u3086", "\u3085"],
    ["\u3088", "\u3087"],
    ["\u308F", "\u308E"],
    ["\u304B", "\u3095"],
    ["\u3051", "\u3096"]
  ]);
  var STEGANA_INVERT = new Map(
    Array.from(STEGANA, (entry) => [entry[1], entry[0]])
  );
  var KEYS2 = [
    ["\u3042", "\u3044", "\u3046", "\u3048", "\u304A"],
    ["\u304B", "\u304D", "\u304F", "\u3051", "\u3053"],
    ["\u3055", "\u3057", "\u3059", "\u305B", "\u305D"],
    ["\u305F", "\u3061", "\u3064", "\u3066", "\u3068"],
    ["\u306A", "\u306B", "\u306C", "\u306D", "\u306E"],
    ["\u306F", "\u3072", "\u3075", "\u3078", "\u307B"],
    ["\u307E", "\u307F", "\u3080", "\u3081", "\u3082"],
    ["\u3084", "\u3086", "\u3088", "", { label: "\u5C0F", value: SMALL_KANA_TRIGGER }],
    ["\u3089", "\u308A", "\u308B", "\u308C", "\u308D"],
    ["\u308F", "\u3092", "\u3093", "\u3001", "\u3002"],
    ["\u309B", "\u309C", "\u30FC", "\uFF1F", "\uFF01"]
  ];
  var PvFiftyKeyKeyboard = class extends i4 {
    render() {
      return x`<div class="container">
      ${KEYS2.map(
        (row, i9) => row.map(
          (key, j2) => key ? x`<button
                class="${i9 % 2 === 0 ? "even" : "odd"}"
                style="grid-column: ${i9 + 1}; grid-row: ${j2 + 1}"
                @click=${() => {
            this.dispatchEvent(
              new CustomEvent("character-select", {
                detail: typeof key === "string" ? key : key.value,
                bubbles: true,
                composed: true
              })
            );
          }}
              >
                ${typeof key === "string" ? key : key.label}
              </button>` : x`<span></span>`
        )
      )}
    </div>`;
    }
  };
  PvFiftyKeyKeyboard.styles = i`
    .container {
      direction: rtl;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(${KEYS2.length}, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    button {
      align-items: center;
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      direction: ltr;
      display: flex;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: max(3vh, 1rem);
      justify-content: center;
      padding: 0 0.5rem;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    }

    button.odd {
      background: var(--color-secondary);
    }

    button:focus,
    button:hover {
      background: var(--color-primary, yellow);
    }
  `;
  PvFiftyKeyKeyboard = __decorateClass([
    t("pv-fifty-key-keyboard")
  ], PvFiftyKeyKeyboard);

  // src/language.ts
  var LatinScriptLanguage = class {
    constructor() {
      this.code = "";
      this.promptName = "";
      this.keyboards = [];
      this.initialPhrases = [];
      this.emotions = [];
      this.aiConfigs = {
        classic: {
          model: "gemini-2.0-flash-001",
          sentence: "SentenceGeneric20250311",
          word: "WordGeneric20240628"
        },
        fast: {
          model: "gemini-2.0-flash-lite-001",
          sentence: "SentenceGeneric20250311",
          word: "WordGeneric20240628"
        },
        smart: {
          model: "gemini-2.0-flash-001",
          sentence: "SentenceGeneric20250311",
          word: "WordGeneric20240628"
        },
        gemini_2_5_flash: {
          model: "gemini-2.5-flash",
          sentence: "SentenceGeneric20250311",
          word: "WordGeneric20240628"
        }
      };
    }
    segment(sentence) {
      return sentence.split(" ");
    }
    join(words) {
      return words.join(" ").replace(/ ([.,!?]+( |$))/g, "$1") + " ";
    }
    appendWord(text, word) {
      if (word.startsWith("-")) {
        return text + word.slice(1) + " ";
      }
      return text + " " + word + " ";
    }
  };
  var English = class extends LatinScriptLanguage {
    constructor() {
      super(...arguments);
      this.code = "en-US";
      this.promptName = "English";
      this.emotions = [
        { emoji: "\u{1F4AC}", prompt: "Statement" },
        { emoji: "\u2753", prompt: "Question" },
        { emoji: "\u{1F64F}", prompt: "Request" },
        { emoji: "\u{1F6AB}", prompt: "Negative" }
      ];
      this.initialPhrases = [
        "I",
        "You",
        "They",
        "What",
        "Why",
        "When",
        "Where",
        "How",
        "Who",
        "Can",
        "Could you",
        "Would you",
        "Do you"
      ];
    }
  };
  var EnglishWithSingleRowKeyboard = class extends English {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-alphanumeric-single-row-keyboard`];
    }
    render() {
      return x`${msg("English (single-row keyboard)")}`;
    }
  };
  var EnglishWithQWERYKeyboard = class extends English {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-qwerty-keyboard`];
    }
    render() {
      return x`${msg("English (QWERTY keyboard)")}`;
    }
  };
  var Japanese = class {
    constructor() {
      this.code = "ja-JP";
      this.promptName = "Japanese";
      this.keyboards = [];
      this.initialPhrases = [
        "\u306F\u3044",
        "\u3044\u3044\u3048",
        "\u3042\u308A\u304C\u3068\u3046",
        "\u3059\u307F\u307E\u305B\u3093",
        "\u304A\u9858\u3044\u3057\u307E\u3059",
        "\u79C1",
        "\u3042\u306A\u305F",
        "\u5F7C",
        "\u5F7C\u5973",
        "\u4ECA\u65E5",
        "\u6628\u65E5",
        "\u660E\u65E5"
      ];
      this.emotions = [
        { emoji: "\u{1F4AC}", prompt: "\u5E73\u53D9", label: "\u666E\u901A" },
        { emoji: "\u2753", prompt: "\u7591\u554F", label: "\u8CEA\u554F" },
        { emoji: "\u{1F64F}", prompt: "\u4F9D\u983C", label: "\u304A\u9858\u3044" },
        { emoji: "\u{1F6AB}", prompt: "\u5426\u5B9A", label: "\u5426\u5B9A" }
      ];
      this.aiConfigs = {
        classic: {
          model: "gemini-2.5-flash",
          sentence: "SentenceJapanese20240628",
          word: "WordGeneric20240628"
        },
        fast: {
          model: "gemini-2.5-flash-lite",
          sentence: "SentenceJapanese20240628",
          word: "WordGeneric20240628"
        },
        smart: {
          model: "gemini-2.5-flash",
          sentence: "SentenceJapaneseLong20250603",
          word: "WordJapanese20250623"
        },
        gemini_2_5_flash: {
          model: "gemini-2.5-flash",
          sentence: "SentenceJapaneseLong20250603",
          word: "WordGeneric20240628"
        }
      };
      this.tinySegmenter = window.TinySegmenter ? new window.TinySegmenter() : null;
    }
    segment(sentence) {
      if (!this.tinySegmenter) {
        return [sentence];
      }
      const segments = this.tinySegmenter?.segment(sentence);
      if (segments.length === 0) {
        return segments;
      }
      let prevSegment = segments[0];
      const results = [prevSegment];
      for (const segment of segments.slice(1)) {
        const prevCode = prevSegment.charCodeAt(prevSegment.length - 1);
        const code = segment.charCodeAt(0);
        if (prevCode >= 55296 && prevCode <= 56319 && code >= 56320 && code <= 57343) {
          results[results.length - 1] += segment;
          prevSegment = results[results.length - 1];
        } else {
          results.push(segment);
          prevSegment = segment;
        }
      }
      return results;
    }
    join(words) {
      return words.join("");
    }
    appendWord(text, word) {
      if (word.startsWith("-")) {
        return text + word.slice(1);
      }
      return text + word;
    }
  };
  var JapaneseWithSingleRowKeyboard = class extends Japanese {
    constructor() {
      super(...arguments);
      this.keyboards = [
        i7`pv-hiragana-single-row-keyboard`,
        i7`pv-alphanumeric-single-row-keyboard`
      ];
    }
    render() {
      return x`${msg("Japanese (single-row keyboard)")}`;
    }
  };
  var JapaneseWithFullKeyboard = class extends Japanese {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-fifty-key-keyboard`, i7`pv-qwerty-keyboard`];
    }
    render() {
      return x`${msg("Japanese (Goj\u016Bon keyboard)")}`;
    }
  };
  var French = class extends LatinScriptLanguage {
    constructor() {
      super(...arguments);
      this.code = "fr-FR";
      this.promptName = "French";
      // TODO: Revise default initial phrases.
      this.initialPhrases = [
        "Je",
        "Tu",
        "Ils",
        "Que",
        "Pourquoi",
        "Quand",
        "O\xF9",
        "Quelle",
        "Qui",
        "Peux-tu",
        "Pourrais-tu",
        "Ferais-tu",
        "Fais-tu"
      ];
    }
  };
  var FrenchExperimental = class extends French {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-french-single-row-keyboard`];
    }
    render() {
      return x`${msg("French (experimental)")}`;
    }
  };
  var German = class extends LatinScriptLanguage {
    constructor() {
      super(...arguments);
      this.code = "de-DE";
      this.promptName = "German";
      // TODO: Revise default initial phrases.
      this.initialPhrases = [
        "Ich",
        "Du",
        "Sie",
        "Was",
        "Warum",
        "Wann",
        "Wo",
        "Wie",
        "Wer",
        "Kannst",
        "K\xF6nntest du",
        "W\xFCrdest du",
        "Tust du"
      ];
    }
  };
  var GermanExperimental = class extends German {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-german-single-row-keyboard`];
    }
    render() {
      return x`${msg("German (experimental)")}`;
    }
  };
  var Swedish = class extends LatinScriptLanguage {
    constructor() {
      super(...arguments);
      this.code = "sv-SE";
      this.promptName = "Swedish";
      this.initialPhrases = [
        "Jag",
        "Du",
        "De",
        "Vad",
        "Varf\xF6r",
        "N\xE4r",
        "Var",
        "Hur",
        "Vem",
        "Burk",
        "Kan",
        "Skulle du",
        "G\xF6r du"
      ];
    }
  };
  var SwedishExperimental = class extends Swedish {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-swedish-single-row-keyboard`];
    }
    render() {
      return x`${msg("Swedish (experimental)")}`;
    }
  };
  var Mandarin = class {
    constructor() {
      this.code = "zh-CN";
      this.promptName = "Mandarin";
      this.keyboards = [];
      this.separetor = "";
      this.initialPhrases = ["\u4F60", "\u6211", "\u4ED6", "\u5979", "\u5B83", "\u597D", "\u4ECA\u5929", "\u6628\u5929", "\u660E\u5929"];
      this.aiConfigs = {
        classic: {
          model: "gemini-2.5-flash",
          sentence: "SentenceMandarin20250616",
          word: "WordMandarin20250616"
        },
        fast: {
          model: "gemini-2.5-flash-lite",
          sentence: "SentenceMandarin20250616",
          word: "WordMandarin20250616"
        },
        smart: {
          model: "gemini-2.5-flash",
          sentence: "SentenceMandarin20250616",
          word: "WordMandarin20250616"
        },
        gemini_2_5_flash: {
          model: "gemini-2.5-flash",
          sentence: "SentenceMandarin20250616",
          word: "WordMandarin20250616"
        }
      };
    }
    segment(sentence) {
      return Array.from(sentence);
    }
    join(words) {
      return words.join("");
    }
    appendWord(text, word) {
      text = text.replace(/[a-z]+$/, "");
      if (word.startsWith("-")) {
        return text + word.slice(1);
      }
      return text + word;
    }
  };
  var MandarinWithSingleRowKeyboard = class extends Mandarin {
    constructor() {
      super(...arguments);
      this.keyboards = [i7`pv-alphanumeric-single-row-keyboard`];
    }
    render() {
      return x`${msg("Mandarin (single-row keyboard)")}`;
    }
  };
  var LANGUAGES = {
    englishWithSingleRowKeyboard: new EnglishWithSingleRowKeyboard(),
    englishWithQWERYKeyboard: new EnglishWithQWERYKeyboard(),
    japaneseWithSingleRowKeyboard: new JapaneseWithSingleRowKeyboard(),
    japaneseWithFullkeyboard: new JapaneseWithFullKeyboard(),
    frenchExperimental: new FrenchExperimental(),
    germanExperimental: new GermanExperimental(),
    mandarinWithSingleRowKeyboard: new MandarinWithSingleRowKeyboard(),
    swedishExperimental: new SwedishExperimental()
  };

  // src/pv-setting-panel.ts
  var EVENT_KEY = {
    okClick: "ok-click"
  };
  var PvSettingPanel = class extends e9(i4) {
    constructor() {
      super(...arguments);
      this.activeSettingsTabIndex = 0;
    }
    show() {
      this.settingsDialog?.show();
    }
    fireEvent(key) {
      this.dispatchEvent(
        new CustomEvent(key, {
          detail: { callee: this },
          bubbles: true,
          composed: true
        })
      );
    }
    render() {
      const profileSettingsPanelTemplate = x`
      <div class="form-section">
        <label>
          ${msg("Persona")}
          <p>
            <md-filled-text-field
              class="pv-persona-text-field"
              type="textarea"
              rows="5"
              @input=${(e10) => {
        this.state.persona = e10.target.value;
      }}
              value="${this.state.persona}"
            >
            </md-filled-text-field>
          </p>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${msg("Initial phrases")}
          <p>
            <md-filled-text-field
              class="pv-initial-phrase-text-field"
              type="textarea"
              rows="3"
              value="${this.state.initialPhrases.join("\n")}"
              @input=${(e10) => {
        this.state.initialPhrases = e10.target.value.split("\n").filter((str2) => str2);
      }}
            >
            </md-filled-text-field>
          </p>
        </label>
      </div>
    `;
      const generalSettingsPanelTemplate = x`
      <div class="form-section">
        <md-outlined-select
          label="${msg("AI")}"
          @change=${(e10) => {
        const selected = e10.composedPath()[0];
        this.state.aiConfig = selected.value;
      }}
        >
          <md-select-option
            ?selected="${this.state.aiConfig === "fast"}"
            value="fast"
          >
            <div slot="headline">${msg("Fast")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig === "smart"}"
            value="smart"
          >
            <div slot="headline">${msg("Smart")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig === "classic"}"
            value="classic"
          >
            <div slot="headline">${msg("Classic")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig === "gemini_2_5_flash"}"
            value="gemini_2_5_flash"
          >
            <div slot="headline">Gemini 2.5 Flash</div>
          </md-select-option>
        </md-outlined-select>
      </div>
      <div class="form-section">
        <label>
          ${msg("Always expand at origin")}
          <md-switch
            ?selected=${this.state.expandAtOrigin}
            @change=${() => {
        this.state.expandAtOrigin = !this.state.expandAtOrigin;
      }}
          ></md-switch>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${msg("Use smaller sentence margin")}
          <md-switch
            ?selected=${this.state.sentenceSmallMargin}
            @change=${() => {
        this.state.sentenceSmallMargin = !this.state.sentenceSmallMargin;
      }}
          ></md-switch>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${msg("Enable earcons")}
          <md-switch
            ?selected=${this.state.enableEarcons}
            @change=${() => {
        this.state.enableEarcons = !this.state.enableEarcons;
      }}
          ></md-switch>
        </label>
      </div>
      ${this.state.features.featureEnableSpeechInput ? x`
            <div class="form-section">
              <label>
                ${msg("Enable conversation mode")}
                <md-switch
                  ?selected=${this.state.enableConversationMode}
                  @change=${() => {
        this.state.enableConversationMode = !this.state.enableConversationMode;
      }}
                ></md-switch>
              </label>
            </div>
          ` : ""}
      <div class="form-section">
        <div>
          <label>${msg("Language")}</label>
        </div>
        <div class="language-select">
          <div>
            ${Object.entries(LANGUAGES).map(
        ([label, lang]) => x`<div class="language-option">
                  <div class="language-option-label">
                    <label>${lang.render()}</label>
                  </div>
                  <div class="language-option-checkbox">
                    <md-checkbox
                      ?checked="${this.state.checkedLanguages.includes(label)}"
                      ?disabled="${this.state.checkedLanguages.length === 1 && this.state.checkedLanguages.includes(label)}"
                      @change=${() => {
          if (this.state.checkedLanguages.includes(label)) {
            this.state.checkedLanguages = this.state.checkedLanguages.filter(
              (lang2) => lang2 !== label
            );
          } else {
            this.state.checkedLanguages = [
              ...this.state.checkedLanguages,
              label
            ];
          }
        }}
                    ></md-checkbox>
                  </div>
                </div>`
      )}
          </div>
        </div>
      </div>
    `;
      const ttsSettingsPanelTemplate = x`
      <div class="form-section">
        <md-outlined-select
          label="${msg("TTS Voice")}"
          @change=${(e10) => {
        const selected = e10.target;
        this.state.voiceName = selected.value;
      }}
        >
          <md-select-option
            value="Default"
            ?selected="${this.state.voiceName === ""}"
          >
            <div slot="headline">Default</div>
          </md-select-option>
          ${window.speechSynthesis.getVoices().filter((voice) => voice.lang.startsWith(this.state.lang.code)).map(
        (voice) => x`<md-select-option
                  value="${voice.name}"
                  ?selected="${this.state.voiceName === voice.name}"
                >
                  <div slot="headline">${voice.name}</div>
                </md-select-option>`
      )}

        </md-outlined-select>
      </div>
      <div class="form-section">
        <label>
          ${msg("Speaking rate")}
          <md-slider
            class="voice-config-slider"
            min="-10"
            max="10"
            value="${this.state.voiceSpeakingRate}"
            @change=${(e10) => {
        this.state.voiceSpeakingRate = Number(
          e10.target.value
        );
      }}
          >
          </md-slider>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${msg("Pitch")}
          <md-slider
            class="voice-config-slider"
            min="-10"
            max="10"
            value="${this.state.voicePitch}"
            @change=${(e10) => {
        this.state.voicePitch = Number(
          e10.target.value
        );
      }}
          >
          </md-slider>
        </label>
      </div>
    `;
      const settingsPanels = [
        generalSettingsPanelTemplate,
        profileSettingsPanelTemplate,
        ttsSettingsPanelTemplate
      ];
      return x`
      <md-dialog>
        <form slot="content" id="form-id" method="dialog">
          <md-tabs
            @change="${(e10) => {
        if (e10.target instanceof MdTabs) {
          this.activeSettingsTabIndex = e10.target.activeTabIndex;
        }
      }}"
          >
            <md-primary-tab ?active="${this.activeSettingsTabIndex === 0}">
              ${msg("General")}
            </md-primary-tab>
            <md-primary-tab ?active="${this.activeSettingsTabIndex === 1}">
              ${msg("Profile")}
            </md-primary-tab>
            <md-primary-tab ?active="${this.activeSettingsTabIndex === 2}">
              ${msg("VOICE")}
            </md-primary-tab>

          </md-tabs>
          ${settingsPanels[this.activeSettingsTabIndex]}
        </form>
        <div slot="actions">
          <md-text-button
            form="form-id"
            @click="${() => {
        this.settingsDialog?.close();
        this.fireEvent(EVENT_KEY.okClick);
      }}"
            >OK</md-text-button
          >
        </div>
      </md-dialog>
    `;
    }
  };
  PvSettingPanel.styles = i`
    :host {
      background: var(--color-background);
      display: flex;

      --md-icon-button-icon-size: 3rem;
      --md-icon-button-state-layer-width: 4rem;
      --md-icon-button-state-layer-height: 4rem;

      --mdc-typography-body2-font-size: 3rem;
      --mdc-typography-body2-line-height: 3.5rem;
    }

    /* Optimized only for iPad. May need to improve. */
    #form-id {
      height: 440px;
      width: 500px;
    }

    .voice-config-slider {
      display: inline-block;
      width: 350px;
    }

    .form-section {
      margin: 1rem 0;
    }

    .language-select {
      border: 1px solid var(--md-sys-color-outline, #79747e);
      border-radius: var(--md-sys-shape-corner-extra-small, 4px);
      display: inline-flex;
      height: 5rem;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .language-option {
      border-color: black;
      display: flex;
      margin: 0.75rem 8px;
    }

    .language-option-label {
      flex: 1;
    }

    .language-option-checkbox {
      flex: 0;
      margin: 0 0 0 0.75rem;
    }

    .pv-persona-text-field,
    .pv-initial-phrase-text-field {
      width: 100%;
    }
  `;
  __decorateClass([
    n3({ type: Object })
  ], PvSettingPanel.prototype, "state", 2);
  __decorateClass([
    n3({ type: Number, reflect: true })
  ], PvSettingPanel.prototype, "activeSettingsTabIndex", 2);
  __decorateClass([
    e4("md-dialog")
  ], PvSettingPanel.prototype, "settingsDialog", 2);
  PvSettingPanel = __decorateClass([
    localized(),
    t("pv-setting-panel")
  ], PvSettingPanel);

  // src/audio-manager.ts
  var clickBuffer = null;
  var chimeBuffer = null;
  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  fetch("/static/click2.wav").then((response) => response.arrayBuffer()).then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer)).then((audioBuffer) => {
    clickBuffer = audioBuffer;
  }).catch((error) => {
    console.warn("Error loading click audio file:", error);
  });
  fetch("/static/chime.wav").then((response) => response.arrayBuffer()).then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer)).then((audioBuffer) => {
    chimeBuffer = audioBuffer;
  }).catch((error) => {
    console.warn("Error loading chime audio file:", error);
  });
  var AudioManager = class {
    static playClick() {
      return new Promise((resolve, reject) => {
        if (!clickBuffer) {
          return reject("Click audio buffer is not loaded yet.");
        }
        const source = ctx.createBufferSource();
        source.buffer = clickBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
          source.disconnect();
          resolve();
        };
        source.start(ctx.currentTime);
      });
    }
    static playChime() {
      return new Promise((resolve, reject) => {
        if (!chimeBuffer) {
          return reject("Chime audio buffer is not loaded yet.");
        }
        const source = ctx.createBufferSource();
        source.buffer = chimeBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
          source.disconnect();
          resolve();
        };
        source.start(ctx.currentTime);
      });
    }
  };

  // src/pv-functions-bar.ts
  var EVENT_KEY2 = {
    backspaceClick: "backspace-click",
    contentCopyClick: "content-copy-click",
    deleteClick: "delete-click",
    firstUpdated: "first-updated",
    keyboardChangeClick: "keyboard-change-click",
    languageChangeClick: "language-change-click",
    settingClick: "setting-click",
    undoClick: "undo-click",
    outputSpeechClick: "output-speech-click"
  };
  var PvFunctionsBar = class extends e9(i4) {
    constructor() {
      super(...arguments);
      this.isTtsReading = false;
      this.lastOutputSpeechInternal = "";
      this.lastInputSpeechInternal = "";
    }
    get lastOutputSpeech() {
      return this.lastOutputSpeechInternal;
    }
    get lastInputSpeech() {
      return this.lastInputSpeechInternal;
    }
    fireEvent(key, detail) {
      this.dispatchEvent(
        new CustomEvent(key, {
          detail: detail ? { callee: this, ...detail } : { callee: this },
          bubbles: true,
          composed: true
        })
      );
    }
    onMicrophoneClick() {
      this.state.isMicrophoneOn = !this.state.isMicrophoneOn;
    }
    render() {
      const isTextEmpty = this.state.text === "";
      const isKeyboardSwitchable = this.state.lang.keyboards.length > 1;
      const isLanguageSwitchable = this.state.checkedLanguages.length > 1;
      return x`
      <div class="functions">
        <div class="functions-bar">
          <button
            @click="${() => {
        this.fireEvent(EVENT_KEY2.undoClick);
      }}"
          >
            <md-icon>undo</md-icon>
            <span>${msg("Undo")}</span>
          </button>
          <button
            @click="${() => {
        this.fireEvent(EVENT_KEY2.backspaceClick);
      }}"
            ?disabled=${isTextEmpty}
          >
            <md-icon>backspace</md-icon>
            <span>${msg("Backspace")}</span>
          </button>
          <button
            @click="${() => {
        this.fireEvent(EVENT_KEY2.deleteClick);
      }}"
            ?disabled=${isTextEmpty}
          >
            <md-icon>delete</md-icon>
            <span>${msg("Clear")}</span>
          </button>
          <hr />
          ${isLanguageSwitchable ? x`
                <button
                  @click="${() => {
        this.fireEvent(EVENT_KEY2.languageChangeClick);
      }}"
                >
                  <md-icon>language</md-icon>
                  <span>${msg("Language")}</span>
                </button>
              ` : ""}
          ${isKeyboardSwitchable ? x`
                <button
                  @click="${() => {
        this.fireEvent(EVENT_KEY2.keyboardChangeClick);
      }}"
                >
                  <md-icon>language_japanese_kana</md-icon>
                  <span>${msg("Keyboard")}</span>
                </button>
              ` : ""}
          <hr />
          <button
            @click="${() => {
        this.fireEvent(EVENT_KEY2.contentCopyClick);
      }}"
            ?disabled=${isTextEmpty}
          >
            <md-icon>content_copy</md-icon>
            <span>${msg("Copy")}</span>
          </button>

          <button
            @click="${this.onTtsButtonClick}"
            ?disabled=${this.isTtsReading || isTextEmpty}
          >
            <md-icon>text_to_speech</md-icon>
            <span>${msg("Read aloud")}</span>
          </button>
          ${this.state.enableConversationMode ? x`
                <button @click="${this.onMicrophoneClick}">
                  <md-icon
                    >${this.state.isMicrophoneOn ? "mic" : "mic_off"}</md-icon
                  >
                  <span>${this.state.isMicrophoneOn ? "Mute" : "Unmute"}</span>
                </button>
              ` : ""}

          <hr />
          <button
            @click="${() => {
        this.fireEvent(EVENT_KEY2.settingClick);
      }}"
          >
            <md-icon>settings</md-icon>
            <span>${msg("Settings")}</span>
          </button>
        </div>
      </div>
    `;
    }
    async onTtsButtonClick() {
      const tts = window.speechSynthesis;
      tts.cancel();
      this.state.lastOutputSpeech = this.state.text;
      if (this.state.enableEarcons) {
        AudioManager.playChime().then(() => {
          this.startTts();
        });
      } else {
        this.startTts();
      }
    }
    startTts() {
      const utterance = new SpeechSynthesisUtterance(this.state.text);
      utterance.lang = this.state.lang.code;
      utterance.rate = Math.pow(2, this.state.voiceSpeakingRate / 10);
      utterance.pitch = (this.state.voicePitch + 20) / 20;
      const tts = window.speechSynthesis;
      const voice = tts.getVoices().find((voice2) => voice2.name === this.state.voiceName);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.addEventListener("end", () => {
        this.onTtsEnd();
      });
      tts.speak(utterance);
      this.isTtsReading = true;
      this.fireEvent(EVENT_KEY2.outputSpeechClick, {
        lastOutputSpeech: this.lastOutputSpeech,
        lastInputSpeech: this.lastInputSpeech
      });
    }
    onTtsEnd() {
      this.isTtsReading = false;
    }
  };
  PvFunctionsBar.styles = i`
    :host {
      display: flex;
      --md-icon-size: 1.5rem;
    }

    .functions {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .functions-bar {
      background: var(--color-secondary);
      border-radius: 10rem;
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
    }

    .functions-bar md-icon {
      font-weight: 300;
    }

    .functions-bar button {
      align-items: center;
      background: none;
      border: none;
      color: var(--color-on-secondary);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-family: inherit;
      margin: 0.25rem 0;
      padding: 0;
    }

    .functions-bar button md-icon img {
      height: 2rem;
      width: 2rem;
    }

    .functions-bar button span {
      display: none;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .functions-bar button:hover md-icon {
      background: rgba(0, 0, 0, 0.1);
    }

    .functions-bar button[disabled] {
      cursor: default;
      opacity: 0.4;
    }

    .functions-bar button[disabled]:hover md-icon {
      background: inherit;
    }

    /* Optimized only for iPad. May need to improve. */
    #form-id {
      height: 380px;
      width: 500px;
    }

    .form-section {
      margin: 1rem 0;
    }

    .pv-persona-text-field,
    .pv-initial-phrase-text-field {
      width: 100%;
    }

    hr {
      border: 0;
      margin: 0;
    }

    md-icon {
      border-radius: 100px;
      padding: 0.25rem;
    }

    @media screen and (min-height: 33rem) {
      :host {
        --md-icon-size: 2rem;
      }

      md-icon {
        padding: 0.5rem;
      }
    }

    @media screen and (min-height: 45rem) {
      .functions-bar {
        padding: 1rem 0.25rem;
      }

      .functions-bar button span {
        display: inline;
      }

      md-icon {
        padding: 0.125rem 0.5rem;
      }

      hr {
        margin: 0.5rem 0;
      }
    }
  `;
  __decorateClass([
    n3({ type: Object })
  ], PvFunctionsBar.prototype, "state", 2);
  __decorateClass([
    n3({ type: Boolean, reflect: true })
  ], PvFunctionsBar.prototype, "isTtsReading", 2);
  __decorateClass([
    n3({ type: String, reflect: true })
  ], PvFunctionsBar.prototype, "lastInputSpeechInternal", 2);
  PvFunctionsBar = __decorateClass([
    localized(),
    t("pv-functions-bar")
  ], PvFunctionsBar);

  // src/pv-snackbar.ts
  var PvSnackbar = class extends i4 {
    constructor() {
      super(...arguments);
      this.labelText = "";
      this.visible = false;
      this.displayTimeout = 0;
    }
    show() {
      if (this.displayTimeout > 0) {
        window.clearTimeout(this.displayTimeout);
      }
      this.visible = true;
      this.displayTimeout = window.setTimeout(() => {
        this.visible = false;
        this.displayTimeout = 0;
        this.dispatchEvent(new Event("closed"));
      }, 5e3);
    }
    render() {
      return this.labelText;
    }
  };
  PvSnackbar.styles = i`
    :host {
      background: rgba(32, 33, 36, 0.8);
      border-radius: 0.5rem;
      bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #fff;
      font-size: 2rem;
      left: 50%;
      opacity: 0;
      padding: 0.5rem 1rem;
      position: fixed;
      transform: translateX(-50%) translateY(100%);
      transition: all 0.3s ease;
      z-index: 100;
    }

    :host([visible]) {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  __decorateClass([
    n3({ type: String })
  ], PvSnackbar.prototype, "labelText", 2);
  __decorateClass([
    n3({ type: Boolean, reflect: true })
  ], PvSnackbar.prototype, "visible", 2);
  PvSnackbar = __decorateClass([
    t("pv-snackbar")
  ], PvSnackbar);

  // src/pv-suggestion-stripe.ts
  var SentenceSuggestion = class {
    constructor(source, value) {
      this.source = source;
      this.value = value;
    }
  };
  var SuggestionSelectEvent = class extends CustomEvent {
  };
  function getLeadingWords(words, offsetWords) {
    const result = [];
    for (let i9 = 0; i9 < words.length; i9++) {
      if (words[i9] === offsetWords[0]) {
        result.push(offsetWords.shift());
      } else {
        break;
      }
    }
    return result;
  }
  function splitPunctuations(words) {
    const splitWords = [];
    for (const word of words) {
      const m4 = word.match(/^(.*[^.,!?])([.,!?]+)$/);
      if (m4) {
        splitWords.push(m4[1]);
        splitWords.push(m4[2]);
      } else {
        splitWords.push(word);
      }
    }
    return splitWords;
  }
  var PvSuggestionStripeElement = class extends i4 {
    constructor() {
      super(...arguments);
      this.suggestion = new SentenceSuggestion("LLM" /* LLM */, "");
      this.offset = "";
      this.mouseoverIndex = -1;
    }
    render() {
      const words = splitPunctuations(
        this.state.lang.segment(this.suggestion.value)
      );
      const leadingWords = getLeadingWords(
        words,
        splitPunctuations(this.state.lang.segment(this.offset))
      );
      return x`${leadingWords.length > 0 ? x`<span class="ellipsis">… </span>` : ""}
    ${words.map(
        (word, i9) => i9 < leadingWords.length ? "" : x` <pv-button
            ?active="${i9 <= this.mouseoverIndex}"
            .label="${word}"
            @mouseenter="${() => {
          this.mouseoverIndex = i9;
        }}"
            @mouseleave="${() => {
          this.mouseoverIndex = -1;
        }}"
            @click="${() => {
          this.dispatchEvent(
            new SuggestionSelectEvent("select", {
              detail: [
                this.state.lang.join(words.slice(0, i9 + 1)),
                i9 - leadingWords.length,
                this.suggestion.source
              ]
            })
          );
        }}"
          ></pv-button>`
      )}`;
    }
  };
  PvSuggestionStripeElement.styles = i`
    :host {
      -ms-overflow-style: none;
      display: block;
      overflow-x: scroll;
      scrollbar-width: none;
      white-space: nowrap;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    pv-button {
      margin-right: 0.5rem;
    }

    .ellipsis {
      font-family: 'Roboto Mono', monospace;
      font-size: 5vh;
    }
  `;
  __decorateClass([
    n3({ type: Object })
  ], PvSuggestionStripeElement.prototype, "state", 2);
  __decorateClass([
    n3({ type: Object, reflect: true })
  ], PvSuggestionStripeElement.prototype, "suggestion", 2);
  __decorateClass([
    n3({ type: String, reflect: true })
  ], PvSuggestionStripeElement.prototype, "offset", 2);
  __decorateClass([
    n3({ type: Number })
  ], PvSuggestionStripeElement.prototype, "mouseoverIndex", 2);
  PvSuggestionStripeElement = __decorateClass([
    t("pv-suggestion-stripe")
  ], PvSuggestionStripeElement);

  // src/pv-scalable-textarea.ts
  var PvScalableTextareaElement = class extends i4 {
    constructor() {
      super(...arguments);
      this.value = "";
      this.minRows = 2;
      this.maxRows = 4;
      this.placeholder = "";
    }
    updateLayout() {
      if (!(this.hiddenTextArea instanceof HTMLTextAreaElement && this.textArea instanceof HTMLTextAreaElement)) {
        return;
      }
      const fontSizeFactor = 0.8;
      const boundingRect = this.getBoundingClientRect();
      this.hiddenTextArea.style.lineHeight = `${Math.round(
        boundingRect.height / this.minRows
      )}px`;
      this.hiddenTextArea.style.fontSize = `${Math.round(
        boundingRect.height / this.minRows * fontSizeFactor
      )}px`;
      const contentHeight = this.hiddenTextArea.scrollHeight;
      const nRows = Math.min(
        this.maxRows,
        Math.max(
          this.minRows,
          Math.floor(contentHeight / (boundingRect.height / this.minRows))
        )
      );
      this.textArea.style.lineHeight = `${Math.round(
        boundingRect.height / nRows
      )}px`;
      this.textArea.style.fontSize = `${Math.round(
        boundingRect.height / nRows * fontSizeFactor
      )}px`;
      this.textArea.value = this.value;
    }
    firstUpdated() {
      window.addEventListener("resize", () => {
        this.updateLayout();
      });
      this.updateLayout();
    }
    updated() {
      if (!(this.hiddenTextArea instanceof HTMLTextAreaElement)) return;
      this.hiddenTextArea.value = this.value;
      this.updateLayout();
      this.dispatchEvent(new Event("updated"));
    }
    render() {
      return x`
      <textarea class="hidden"></textarea>
      <textarea
        class="main"
        placeholder="${this.placeholder}"
        @input="${(e10) => {
        if (e10.isComposing) return;
        this.value = e10.composedPath()[0].value;
      }}"
        @compositionend="${(e10) => {
        this.value = e10.composedPath()[0].value;
      }}"
      ></textarea>
    `;
    }
  };
  PvScalableTextareaElement.styles = i`
    :host {
      display: block;
      position: relative;
    }

    textarea {
      background: var(--color-surface);
      border-radius: 0.5rem;
      border: solid 1px var(--color-outline);
      box-sizing: border-box;
      color: var(--color-on-surface);
      font-family: Roboto, 'Noto Sans JP', sans-serif;
      height: 100%;
      width: 100%;
    }

    textarea.hidden {
      opacity: 0;
      pointer-events: none;
      position: absolute;
    }
  `;
  __decorateClass([
    n3({ type: String })
  ], PvScalableTextareaElement.prototype, "value", 2);
  __decorateClass([
    n3({ type: Number })
  ], PvScalableTextareaElement.prototype, "minRows", 2);
  __decorateClass([
    n3({ type: Number })
  ], PvScalableTextareaElement.prototype, "maxRows", 2);
  __decorateClass([
    n3({ type: String, reflect: true })
  ], PvScalableTextareaElement.prototype, "placeholder", 2);
  __decorateClass([
    e4("textarea.hidden")
  ], PvScalableTextareaElement.prototype, "hiddenTextArea", 2);
  __decorateClass([
    e4("textarea.main")
  ], PvScalableTextareaElement.prototype, "textArea", 2);
  PvScalableTextareaElement = __decorateClass([
    t("pv-scalable-textarea")
  ], PvScalableTextareaElement);

  // src/input-history.ts
  var InputSource = {
    BUTTON_BACKSPACE: { kind: "BUTTON_BACKSPACE" /* BUTTON_BACKSPACE */ },
    BUTTON_DELETE: { kind: "BUTTON_DELETE" /* BUTTON_DELETE */ },
    CHARACTER: { kind: "CHARACTER" /* CHARACTER */ },
    KEYBOARD: { kind: "KEYBOARD" /* KEYBOARD */ },
    SNACK_BAR: { kind: "SNACK_BAR" /* SNACK_BAR */ },
    SUGGESTED_WORD: { kind: "SUGGESTED_WORD" /* SUGGESTED_WORD */ }
  };
  var HistoryElement = class {
    constructor(value, sources) {
      this.value = value;
      this.sources = sources;
    }
  };
  var InputHistory = class _InputHistory {
    constructor() {
      this.history = [new HistoryElement("", [])];
      this.currentIndex = 0;
    }
    static {
      this.SIZE = 250;
    }
    add(element) {
      this.history = this.history.slice(this.currentIndex);
      this.history.unshift(element);
      this.currentIndex = 0;
      this.history = this.history.slice(0, _InputHistory.SIZE);
    }
    canUndo() {
      return this.currentIndex < this.history.length - 1;
    }
    undo() {
      if (this.canUndo()) {
        this.currentIndex++;
      }
    }
    /**
     * Returns the last element of the input history.
     * @returns The last element.
     */
    lastInput() {
      return this.history[this.currentIndex];
    }
    isLastInputSuggested() {
      const last = this.lastInput();
      if (!last) {
        return false;
      }
      return last.sources.some(
        (source) => source.kind === "SUGGESTED_WORD" /* SUGGESTED_WORD */ || source.kind === "SUGGESTED_SENTENCE" /* SUGGESTED_SENTENCE */
      );
    }
  };

  // src/pv-textarea-wrapper.ts
  var EVENT_KEY3 = {
    textUpdate: "text-update"
  };
  var PvTextareaWrapper = class extends i4 {
    constructor() {
      super(...arguments);
      this.inputHistory = new InputHistory();
    }
    get value() {
      return this.textArea?.value || "";
    }
    isBlank() {
      return this.textArea && this.textArea.value === "";
    }
    canUndo() {
      return this.inputHistory.canUndo();
    }
    isLastInputSuggested() {
      return this.inputHistory.isLastInputSuggested();
    }
    setPlaceholder(str2) {
      this.textArea.placeholder = str2;
    }
    setTextFieldValue(value, source) {
      if (!this.textArea) return;
      this.addToInputHistory(value, source);
      this.textArea.value = value;
      this.textArea.placeholder = "";
    }
    // Add to input history without changing the text field value or placeholder
    addToInputHistory(value, source) {
      const element = new HistoryElement(value, source);
      this.inputHistory.add(element);
    }
    textUndo() {
      if (!this.textArea || !this.inputHistory) return;
      this.inputHistory.undo();
      const element = this.inputHistory.lastInput();
      this.textArea.value = element.value;
      this.textArea.placeholder = "";
    }
    textDelete() {
      this.setTextFieldValue("", [InputSource.BUTTON_DELETE]);
    }
    textBackspace() {
      if (!this.textArea) return;
      const fieldText = this.value;
      const len = fieldText.length;
      this.setTextFieldValue(fieldText.substring(0, len - 1), [
        InputSource.BUTTON_BACKSPACE
      ]);
    }
    contentCopy() {
      if (!this.textArea) return;
      navigator.clipboard.writeText(this.value);
    }
    render() {
      const onTextFieldUpdate = (event) => {
        const value = event.target.value;
        this.state.text = value;
        const last = this.inputHistory.lastInput();
        const prev = last?.value || "";
        if (value !== prev) {
          const element = new HistoryElement(value, [InputSource.KEYBOARD]);
          this.inputHistory.add(element);
        }
        this.fireEvent(this.inputHistory.lastInput().sources);
      };
      return x`
      <pv-scalable-textarea @updated="${onTextFieldUpdate}">
      </pv-scalable-textarea>
    `;
    }
    fireEvent(sources) {
      this.dispatchEvent(
        new CustomEvent(EVENT_KEY3.textUpdate, {
          detail: { callee: this, sources },
          bubbles: true,
          composed: true
        })
      );
    }
  };
  PvTextareaWrapper.styles = i`
    pv-scalable-textarea {
      box-sizing: border-box;
      height: 20svh;
    }
  `;
  __decorateClass([
    n3({ type: Object })
  ], PvTextareaWrapper.prototype, "state", 2);
  __decorateClass([
    e4("pv-scalable-textarea")
  ], PvTextareaWrapper.prototype, "textArea", 2);
  PvTextareaWrapper = __decorateClass([
    t("pv-textarea-wrapper"),
    localized()
  ], PvTextareaWrapper);

  // src/pv-sentence-type-selector.ts
  var PvSentenceTypeSelectorElement = class extends i4 {
    constructor() {
      super(...arguments);
      this.selected = "";
      this.sentenceTypes = [];
    }
    render() {
      return x`<ul>
      ${this.sentenceTypes.map((sentenceType) => {
        return x`<li>
          <button
            @click=${() => {
          this.selected = sentenceType.prompt === this.selected ? "" : sentenceType.prompt;
          this.dispatchEvent(new Event("select"));
        }}
            class="${sentenceType.prompt === this.selected ? "selected" : ""}"
          >
            <div class="emoji">${sentenceType.emoji}</div>
            <div class="label">
              ${sentenceType.label ?? sentenceType.prompt}
            </div>
          </button>
        </li>`;
      })}
    </ul>`;
    }
  };
  PvSentenceTypeSelectorElement.styles = i`
    ul {
      background: var(--color-surface);
      border-radius: 2rem;
      display: inline-flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
      padding: 1rem;
    }

    li {
      text-align: center;
    }

    button {
      border-radius: 1rem;
      border: solid 3px transparent;
      color: #202124;
      cursor: pointer;
      font-family: var(--font-family-base);
      padding: 0.5rem 1rem;
      width: 8rem;
    }

    button:hover,
    button.selected {
      background: var(--color-primary);
    }

    button.selected {
      border-color: black;
    }

    button .emoji {
      font-size: 3rem;
      line-height: 1;
    }

    button .label {
      font-weight: 500;
    }
  `;
  __decorateClass([
    n3({ type: String })
  ], PvSentenceTypeSelectorElement.prototype, "selected", 2);
  __decorateClass([
    n3({ type: Array })
  ], PvSentenceTypeSelectorElement.prototype, "sentenceTypes", 2);
  PvSentenceTypeSelectorElement = __decorateClass([
    t("pv-sentence-type-selector")
  ], PvSentenceTypeSelectorElement);

  // src/pv-app.ts
  var import_diff_match_patch = __toESM(require_diff_match_patch());

  // src/config-storage.ts
  var ConfigStorage = class {
    /**
     * Creates an instance of ConfigStorage.
     * @param domainHead The prefix for keys in the storage.
     * @param defaultValues A default Config value.
     */
    constructor(domainHead, defaultValues) {
      this.domainHead = domainHead;
      this.defaultValues = defaultValues;
    }
    /**
     * Reads a value from storage or default.
     * @param key - The key to read.
     * @returns The value associated with the key.
     */
    read(key) {
      const fullKey = `${this.domainHead}.${key}`;
      const retPair = localStorage.getItem(fullKey);
      if (retPair === null) {
        return this.defaultValues[key];
      }
      try {
        const { value } = JSON.parse(retPair);
        return value;
      } catch (e10) {
        return this.defaultValues[key];
      }
    }
    /**
     * Writes a value to storage.
     * @param key The key to write.
     * @param value The value to value.
     */
    write(key, value) {
      const fullKey = `${this.domainHead}.${key}`;
      const str2 = JSON.stringify({ value });
      localStorage.setItem(fullKey, str2);
    }
  };

  // src/locale-codes.ts
  var sourceLocale2 = `en`;
  var targetLocales = [
    `ja`
  ];

  // src/locales/ja.ts
  var ja_exports = {};
  __export(ja_exports, {
    templates: () => templates2
  });
  var templates2 = {
    "s09085b07b5a0de5f": `AI\u8A2D\u5B9A`,
    "s12be3981db8aad36": `\u65E5\u672C\u8A9E (\u4E94\u5341\u97F3\u30AD\u30FC\u30DC\u30FC\u30C9)`,
    "s1369ddcc1b221411": `\u58F0\u306E\u9AD8\u3055`,
    "s19e84b851836664f": `\u9AD8\u901F`,
    "s2ca367238c69d1e7": `\u82F1\u8A9E (QWERTY\u30AD\u30FC\u30DC\u30FC\u30C9)`,
    "s3687049d1af562c4": `\u30B3\u30D4\u30FC`,
    "s3ceed4d952789f32": `\u8CE2\u3044`,
    "s41b4752c216d0b66": `\u4F1A\u8A71`,
    "s54f4fb35b3a04e2a": `\u82F1\u8A9E (\u4E00\u884C\u30AD\u30FC\u30DC\u30FC\u30C9)`,
    "s59e3e7ab292d7c11": `\u6587\u306E\u884C\u9593\u3092\u8A70\u3081\u308B`,
    "s5bc98d6c14b1d2c6": `\u8AAD\u307F\u4E0A\u3052\u308B`,
    "s5c9bb69e2a31ad59": `VOICE`,
    "s612301cee43af417": `\u52B9\u679C\u97F3\u3092\u518D\u751F`,
    "s6e237556e679b5b8": `\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u97F3\u58F0`,
    "s868a566fb9603774": `\u30AD\u30FC\u30DC\u30FC\u30C9`,
    "s8f4be9f086eb530f": `\u3082\u3068\u306B\u623B\u3059`,
    "s91b073374c468b93": `\u5229\u7528\u8005\u306E\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB`,
    "s98aa8b9481114f33": `\u65E7\u30D0\u30FC\u30B8\u30E7\u30F3`,
    "s9c2aff542563e783": `\u65E5\u672C\u8A9E (\u4E00\u884C\u30AD\u30FC\u30DC\u30FC\u30C9)`,
    "s9d8b8aa2b404c2c8": `\u8A2D\u5B9A`,
    "sb061ff5a347a296e": `\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB`,
    "sb46606bea7e65177": `\u8AAD\u3080\u901F\u3055`,
    "sb4f1dffbb6be6302": `\u3059\u3079\u3066\u524A\u9664`,
    "sb6bc71df20a5484d": `\u30AD\u30FC\u3092\u5DE6\u7AEF\u304B\u3089\u5C55\u958B\u3059\u308B`,
    "sba8b78a7337ff2f4": `\u4F1A\u8A71\u30E2\u30FC\u30C9`,
    "sc3ac225273c8316b": `\u4E00\u822C`,
    "sd64445ead33533cc": `\u4E00\u6587\u5B57\u6D88\u3059`,
    "se127d1b851b56845": `\u521D\u671F\u30D5\u30EC\u30FC\u30BA`,
    "sefcf950b3cc4fc3b": `\u8A00\u8A9E\u5207\u66FF\u3048`,
    "sbd72ef798f281712": `French (experimental)`,
    "s408eb983f697801c": `German (experimental)`,
    "s5f836100f0c5709f": `Swedish (experimental)`,
    "s579d06c51e72b5a8": `Mandarin (single-row keyboard)`
  };

  // src/pv-app-css.ts
  var pvAppStyle = i`
  :host {
    display: flex;
  }

  .container {
    box-sizing: border-box;
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
  }

  .main {
    column-gap: 0.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .main textarea {
    width: 100%;
  }

  .keypad {
    flex: 1;
    min-height: 50vh;
  }

  .loader {
    align-items: center;
    background: color-mix(
      in srgb,
      var(--color-background) 80%,
      transparent 20%
    );
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: 0.3s ease;
    width: 100%;
  }

  .loader.loading {
    opacity: 1;
  }

  /* Optimized only for iPad. May need to improve. */
  #form-id {
    height: 380px;
    width: 500px;
  }

  .form-section {
    margin: 1rem 0;
  }

  .suggestions {
    position: relative;
  }

  ul.word-suggestions,
  ul.sentence-suggestions {
    list-style: none;
    margin: 0.25rem 0;
    padding: 0;
  }

  ul.word-suggestions li {
    display: inline-block;
  }

  ul.word-suggestions li,
  ul.sentence-suggestions li {
    margin: 0.25rem 0.25rem 0.25rem 0;
  }

  @media screen and (min-height: 30rem) {
    ul.word-suggestions li {
      margin: 0.5rem 0.5rem 0.5rem 0;
    }

    ul.sentence-suggestions li {
      margin: 1rem 0.5rem 2rem 0;
    }

    ul.sentence-suggestions li.tight {
      margin: 0.5rem 0.5rem 0.5rem 0;
    }
  }

  @media screen and (min-height: 45rem) {
    ul.word-suggestions li {
      margin: 1rem 1rem 1rem 0;
    }
  }

  .stats {
    background-color: rgba(1, 1, 1, 0);
    border: solid rgba(96, 96, 96, 0.5);
    bottom: 4px;
    color: rgba(96, 96, 96, 0.5);
    cursor: pointer;
    padding: 4px;
    position: absolute;
    right: 4px;
  }

  @media (prefers-color-scheme: dark) {
    .stats {
      background-color: rgba(1, 1, 1, 0);
      border: solid rgba(255, 255, 255, 0.5);
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .language-name {
    background: var(--color-on-background);
    border-radius: 1rem;
    color: var(--color-background);
    display: none;
    font-size: 2rem;
    left: 50%;
    padding: 1rem;
    pointer-events: none;
    position: fixed;
    opacity: 0.8;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .language-name[active] {
    display: block;
  }

  .conversation-history-container {
    background: var(--color-surface);
    border-radius: 0.5rem;
    max-width: 30vw;
    overflow: scroll;
    padding: 0.5rem;
    width: 360px;
  }

  pv-sentence-type-selector {
    margin-bottom: 1rem;
  }
`;

  // src/state.ts
  var State2 = class {
    constructor(storage = null) {
      // The @signal decorator https://lit.dev/docs/data/signals/#decorators
      // doesn't work with experimentalDecorators = true which is currently used
      // for this app. For now, we use hand wrtten getters / setters for accessing
      // state.
      this.langSignal = r10(LANGUAGES["japaneseWithSingleRowKeyboard"]);
      this.checkedLanguagesSignal = r10([]);
      this.keyboardSignal = r10(i7`pv-alphanumeric-single-row-keyboard`);
      this.emotionSignal = r10("");
      this.textSignal = r10("");
      this.aiConfigInternal = "smart";
      this.expandAtOriginSignal = r10(false);
      this.sentenceSmallMarginSignal = r10(false);
      this.personaInternal = "";
      this.initialPhrasesSignal = r10([]);
      this.enableEarconsInternal = false;
      this.enableConversationModeSignal = r10(false);
      this.isMicrophoneOnSignal = r10(false);
      this.lastInputSpeech = "";
      this.lastOutputSpeech = "";
      this.messageHistoryInternal = [];
      // TODO: This is a little hacky... Consider a better way.
      this.features = {
        languages: [],
        sentenceMacroId: null,
        wordMacroId: null,
        featureEnableSpeechInput: false,
        featureEnableSentenceEmotion: false
      };
      this.storage = storage ?? new ConfigStorage("com.google.pv", CONFIG_DEFAULT);
      this.loadState();
      this.updateInitialPhrasesForCurrentLanguage();
    }
    get lang() {
      return this.langSignal.get();
    }
    set lang(newLang) {
      this.langSignal.set(newLang);
    }
    get checkedLanguages() {
      return this.checkedLanguagesSignal.get();
    }
    set checkedLanguages(newCheckedLanguages) {
      this.storage.write("checkedLanguages", newCheckedLanguages);
      this.checkedLanguagesSignal.set(newCheckedLanguages);
    }
    get keyboard() {
      return this.keyboardSignal.get();
    }
    set keyboard(newKeyboard) {
      this.keyboardSignal.set(newKeyboard);
    }
    get emotion() {
      return this.emotionSignal.get();
    }
    set emotion(newEmotion) {
      this.emotionSignal.set(newEmotion);
    }
    get text() {
      return this.textSignal.get();
    }
    set text(newText) {
      this.textSignal.set(newText);
    }
    get aiConfig() {
      return this.aiConfigInternal;
    }
    set aiConfig(newAiConfig) {
      this.storage.write("aiConfig", newAiConfig);
      this.aiConfigInternal = newAiConfig;
    }
    get model() {
      return this.lang.aiConfigs[this.aiConfig]?.model;
    }
    get sentenceMacroId() {
      return this.lang.aiConfigs[this.aiConfig]?.sentence;
    }
    get wordMacroId() {
      return this.lang.aiConfigs[this.aiConfig]?.word;
    }
    get expandAtOrigin() {
      return this.expandAtOriginSignal.get();
    }
    set expandAtOrigin(newExpandAtOrigin) {
      this.storage.write("expandAtOrigin", newExpandAtOrigin);
      this.expandAtOriginSignal.set(newExpandAtOrigin);
    }
    get sentenceSmallMargin() {
      return this.sentenceSmallMarginSignal.get();
    }
    set sentenceSmallMargin(newSentenceSmallMargin) {
      this.storage.write("sentenceSmallMargin", newSentenceSmallMargin);
      this.sentenceSmallMarginSignal.set(newSentenceSmallMargin);
    }
    get persona() {
      return this.personaInternal;
    }
    set persona(newPersona) {
      this.storage.write("persona", newPersona);
      this.personaInternal = newPersona;
    }
    get initialPhrases() {
      return this.initialPhrasesSignal.get();
    }
    set initialPhrases(newInitialPhrases) {
      const currentLanguageKey = this.getCurrentLanguageKey();
      if (currentLanguageKey) {
        const perLanguagePhrases = this.storage.read("initialPhrasesPerLanguage");
        perLanguagePhrases[currentLanguageKey] = newInitialPhrases;
        this.storage.write("initialPhrasesPerLanguage", perLanguagePhrases);
      }
      this.initialPhrasesSignal.set(newInitialPhrases);
    }
    /**
     * Gets initial phrases for a specific language.
     * @param languageKey The language key (e.g., 'japaneseWithSingleRowKeyboard')
     * @returns The initial phrases for the language
     */
    getInitialPhrasesForLanguage(languageKey) {
      const perLanguagePhrases = this.storage.read("initialPhrasesPerLanguage");
      return perLanguagePhrases[languageKey] || [];
    }
    /**
     * Sets initial phrases for a specific language.
     * @param languageKey The language key (e.g., 'japaneseWithSingleRowKeyboard')
     * @param phrases The initial phrases to set
     */
    setInitialPhrasesForLanguage(languageKey, phrases) {
      const perLanguagePhrases = this.storage.read("initialPhrasesPerLanguage");
      perLanguagePhrases[languageKey] = phrases;
      this.storage.write("initialPhrasesPerLanguage", perLanguagePhrases);
      if (this.getCurrentLanguageKey() === languageKey) {
        this.initialPhrasesSignal.set(phrases);
      }
    }
    /**
     * Gets the current language key based on the current language object.
     * @returns The language key or null if not found
     */
    getCurrentLanguageKey() {
      for (const [key, language] of Object.entries(LANGUAGES)) {
        if (language === this.lang) {
          return key;
        }
      }
      return null;
    }
    /**
     * Updates initial phrases to match the current language.
     * This should be called when switching languages.
     */
    updateInitialPhrasesForCurrentLanguage() {
      const currentLanguageKey = this.getCurrentLanguageKey();
      if (currentLanguageKey) {
        const storedPhrases = this.getInitialPhrasesForLanguage(currentLanguageKey);
        if (storedPhrases.length > 0) {
          this.initialPhrasesSignal.set(storedPhrases);
        } else {
          this.initialPhrasesSignal.set(this.lang.initialPhrases);
          this.setInitialPhrasesForLanguage(
            currentLanguageKey,
            this.lang.initialPhrases
          );
        }
      }
    }
    get voiceSpeakingRate() {
      return this.voiceSpeakingRateInternal;
    }
    set voiceSpeakingRate(newVoiceSpeakingRate) {
      this.voiceSpeakingRateInternal = newVoiceSpeakingRate;
      this.storage.write("voiceSpeakingRate", newVoiceSpeakingRate);
    }
    get voicePitch() {
      return this.voicePitchInternal;
    }
    set voicePitch(newVoicePitch) {
      this.voicePitchInternal = newVoicePitch;
      this.storage.write("voicePitch", newVoicePitch);
    }
    get voiceName() {
      return this.voiceNameInternal;
    }
    set voiceName(newVoiceName) {
      this.voiceNameInternal = newVoiceName;
      this.storage.write("ttsVoice", newVoiceName);
    }
    get enableEarcons() {
      return this.enableEarconsInternal;
    }
    set enableEarcons(newEnableEarcons) {
      this.storage.write("enableEarcons", newEnableEarcons);
      this.enableEarconsInternal = newEnableEarcons;
    }
    get enableConversationMode() {
      return this.enableConversationModeSignal.get();
    }
    set enableConversationMode(newEnableConversationMode) {
      this.storage.write("enableConversationMode", newEnableConversationMode);
      this.enableConversationModeSignal.set(newEnableConversationMode);
    }
    get isMicrophoneOn() {
      return this.isMicrophoneOnSignal.get();
    }
    set isMicrophoneOn(newIsMicrophoneOn) {
      this.isMicrophoneOnSignal.set(newIsMicrophoneOn);
    }
    get messageHistory() {
      return this.messageHistoryInternal;
    }
    set messageHistory(newMessageHistory) {
      this.messageHistoryInternal = newMessageHistory;
      this.storage.write("messageHistoryWithPrefix", newMessageHistory);
    }
    loadState() {
      this.aiConfigInternal = this.storage.read("aiConfig");
      this.checkedLanguages = this.storage.read("checkedLanguages");
      this.enableConversationMode = this.storage.read("enableConversationMode");
      this.enableEarconsInternal = this.storage.read("enableEarcons");
      this.expandAtOrigin = this.storage.read("expandAtOrigin");
      const globalInitialPhrases = this.storage.read("initialPhrases");
      const perLanguagePhrases = this.storage.read("initialPhrasesPerLanguage");
      if (globalInitialPhrases && globalInitialPhrases.length > 0 && (!perLanguagePhrases || Object.keys(perLanguagePhrases).length === 0)) {
        const defaultLanguageKey = this.checkedLanguages[0];
        const migratedPhrases = {
          ...perLanguagePhrases,
          [defaultLanguageKey]: globalInitialPhrases
        };
        this.storage.write("initialPhrasesPerLanguage", migratedPhrases);
      }
      this.messageHistoryInternal = this.storage.read("messageHistoryWithPrefix");
      this.personaInternal = this.storage.read("persona");
      this.sentenceSmallMargin = this.storage.read("sentenceSmallMargin");
      this.voiceNameInternal = this.storage.read("ttsVoice");
      this.voicePitchInternal = this.storage.read("voicePitch");
      this.voiceSpeakingRateInternal = this.storage.read("voiceSpeakingRate");
    }
    /**
     * Sets the storage to a new instance, and reloads the state. The new storage
     * needs to have a different domainHead.
     */
    setStorage(storage) {
      if (this.storage.domainHead === storage.domainHead) {
        return;
      }
      this.storage = storage;
      this.loadState();
    }
  };

  // src/pv-app.ts
  var URL_PARAMS = {
    SENTENCE_MACRO_ID: "sentenceMacroId",
    WORD_MACRO_ID: "wordMacroId"
  };
  var MIN_MESSAGE_LENGTH = 0;
  var MAX_EDIT_DIFF_LENGTH = 10;
  var MESSAGE_HISTORY_LIMIT = 1024;
  var MIN_SUGGESTION_LENGTH = 3;
  var MODIFIABLE_TEXT_LENGTH = 10;
  var MAX_SENTENCE_LENGTH_NICE_TO_LLM = 30;
  var MAX_DIFFS = 10;
  var { setLocale: setLocale2 } = configureLocalization({
    sourceLocale: sourceLocale2,
    targetLocales,
    loadLocale: async (locale) => {
      return new Promise((resolve) => {
        switch (locale) {
          case "ja":
            resolve(ja_exports);
            break;
          default:
            resolve({});
        }
      });
    }
  });
  function getSharedPrefix(sentences) {
    if (sentences.length === 0) return "";
    const sentenceLengths = sentences.map((s6) => s6.length);
    const minLength = Math.min(...sentenceLengths);
    for (let i9 = 0; i9 < minLength; i9++) {
      if (new Set(sentences.map((s6) => s6[i9])).size !== 1) {
        return sentences[0].slice(0, i9);
      }
    }
    return sentences[sentenceLengths.indexOf(minLength)];
  }
  function normalize(sentence, isLastInputFromSuggestion) {
    let result = sentence.replaceAll("\u309B", "\u3099").replaceAll("\u309C", "\u309A").normalize("NFKC").replaceAll("\u3099", "\u309B").replaceAll("\u309A", "\u309C").replace(/^\s+/, "").replace(/\s\s+/, " ");
    if (isLastInputFromSuggestion) {
      result = result.replace(/ ([,.?!])$/, "$1");
    }
    return result;
  }
  function splitToSentences(text) {
    const delim = /([。？！]|[.?!] ) */;
    const result = [];
    let i9 = 0;
    while (i9 < text.length) {
      const match = delim.exec(text.substring(i9));
      if (!match) {
        result.push(text.substring(i9));
        break;
      }
      const endIndex = i9 + match.index + match[0].length;
      result.push(text.substring(i9, endIndex));
      i9 = endIndex;
    }
    return result;
  }
  function splitLastSentence(text) {
    const sentences = splitToSentences(text);
    if (sentences.length === 0) {
      return ["", ""];
    }
    return [
      sentences.slice(0, sentences.length - 1).join(""),
      sentences[sentences.length - 1].trimEnd()
    ];
  }
  function splitLastFewSentencesForLLM(text) {
    const sentences = splitToSentences(text);
    if (sentences.length === 0) {
      return ["", ""];
    }
    const sentenceLengths = sentences.map((s6) => s6.length);
    let totalLength = 0;
    for (let i9 = sentenceLengths.length - 1; i9 >= 0; i9--) {
      totalLength += sentenceLengths[i9];
      if (totalLength >= MAX_SENTENCE_LENGTH_NICE_TO_LLM) {
        return [sentences.slice(0, i9).join(""), sentences.slice(i9).join("")];
      }
    }
    return ["", text];
  }
  function getUserInputPrefix(text) {
    const match = text.match(/^[A-Za-z あ-んー]*/u);
    return match ? match[0] : "";
  }
  function ignoreUnnecessaryDiffs(text, newText) {
    const diffMatchPatch = new import_diff_match_patch.diff_match_patch();
    const diffs = diffMatchPatch.diff_main(text, newText);
    diffMatchPatch.diff_cleanupSemantic(diffs);
    if (diffs.length > MAX_DIFFS || diffs.every((diff) => diff[0] !== 0)) {
      return newText;
    }
    let result = "";
    for (let i9 = 0; i9 < diffs.length; i9++) {
      const [op, str2] = diffs[i9];
      if (result.length < text.length - MODIFIABLE_TEXT_LENGTH) {
        if (op === 0 || op === -1) {
          result += str2;
          if (i9 < diffs.length - 1 && op === -1 && diffs[i9 + 1][0] === 1) {
            i9++;
          }
        }
      } else {
        if (op === 0 || op === 1) {
          result += str2;
        }
      }
    }
    if (result === text) {
      return newText;
    }
    return result;
  }
  function playClickSound() {
    return function(target, propertyKey, descriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function(...args) {
        if (this.state.enableEarcons) AudioManager.playClick();
        return originalMethod.apply(this, args);
      };
      return descriptor;
    };
  }
  var PvAppElement = class extends e9(i4) {
    constructor(state = null, apiClient = null) {
      super();
      this.isSpeechRecognitionActive = false;
      this.suggestions = [];
      this.words = [];
      this.isLoading = false;
      this.locale = "ja";
      this.sentenceMacroId = null;
      this.languageLabels = "japaneseWithSingleRowKeyboard,englishWithSingleRowKeyboard";
      this.languageIndex = 0;
      this.keyboardIndex = 0;
      this.conversationHistory = [];
      this.emotions = [];
      this.featureStorageDomain = "com.google.pv";
      this.featureEnableSpeechInput = false;
      this.featureEnableSentenceEmotion = false;
      this.inFlightRequests = 0;
      this.prevCallsMs = [];
      this.stateInternal = state ?? new State2();
      this.apiClient = apiClient ?? new MacroApiClient();
    }
    get state() {
      return this.stateInternal;
    }
    connectedCallback() {
      super.connectedCallback();
      this.stateInternal.setStorage(
        new ConfigStorage(this.featureStorageDomain, CONFIG_DEFAULT)
      );
      setLocale2(this.locale ? this.locale : "ja");
      this.stateInternal.features = {
        languages: this.languageLabels.split(","),
        sentenceMacroId: this.sentenceMacroId,
        wordMacroId: null,
        featureEnableSpeechInput: this.featureEnableSpeechInput,
        featureEnableSentenceEmotion: this.featureEnableSentenceEmotion
      };
      if (this.stateInternal.checkedLanguages.length === 0) {
        this.stateInternal.checkedLanguages = this.stateInternal.features.languages;
      }
      this.stateInternal.lang = LANGUAGES[this.stateInternal.checkedLanguages[0]];
      this.stateInternal.keyboard = this.stateInternal.lang.keyboards[this.keyboardIndex];
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has(URL_PARAMS.SENTENCE_MACRO_ID)) {
        this.stateInternal.features.sentenceMacroId = urlParams.get(
          URL_PARAMS.SENTENCE_MACRO_ID
        );
      }
      if (urlParams.has(URL_PARAMS.WORD_MACRO_ID)) {
        this.stateInternal.features.wordMacroId = urlParams.get(
          URL_PARAMS.WORD_MACRO_ID
        );
      }
      this.stateInternal.updateInitialPhrasesForCurrentLanguage();
      this.emotions = this.stateInternal.lang.emotions;
    }
    updated(changedProps) {
      super.updated?.(changedProps);
      if (this.state.enableConversationMode && this.state.features.featureEnableSpeechInput && this.state.isMicrophoneOn) {
        this.startSpeechRecognition();
      } else {
        this.stopSpeechRecognition();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopSpeechRecognition();
    }
    startSpeechRecognition() {
      if (this.isSpeechRecognitionActive) return;
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionCtor) return;
      this.speechRecognition = new SpeechRecognitionCtor();
      if (!this.speechRecognition) {
        return;
      }
      this.speechRecognition.lang = this.state.lang.code;
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = false;
      this.speechRecognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult && lastResult.isFinal && lastResult[0]) {
          const recognizedText = lastResult[0].transcript.trim();
          if (recognizedText) {
            this.conversationHistory = [
              ...this.conversationHistory,
              [Date.now(), `PartnerInput: ${recognizedText}`]
            ];
            this.state.lastInputSpeech = recognizedText;
            if (this.snackbar?.labelText !== void 0) {
              this.snackbar.labelText = recognizedText;
              this.snackbar.show();
            }
          }
        }
      };
      this.speechRecognition.onerror = () => {
        this.stopSpeechRecognition();
        if (this.state.enableConversationMode && this.state.features.featureEnableSpeechInput && this.state.isMicrophoneOn) {
          setTimeout(() => this.startSpeechRecognition(), 1e3);
        }
      };
      this.speechRecognition.onend = () => {
        this.isSpeechRecognitionActive = false;
        if (this.state.enableConversationMode && this.state.features.featureEnableSpeechInput && this.state.isMicrophoneOn) {
          this.startSpeechRecognition();
        }
      };
      this.speechRecognition.start();
      this.isSpeechRecognitionActive = true;
    }
    stopSpeechRecognition() {
      if (this.speechRecognition) {
        this.speechRecognition.onresult = null;
        this.speechRecognition.onerror = null;
        this.speechRecognition.onend = null;
        this.speechRecognition.stop();
        this.speechRecognition = void 0;
      }
      this.isSpeechRecognitionActive = false;
    }
    isBlank() {
      return this.textField && this.textField.value === "";
    }
    updateConversationHistory() {
      const newMessage = `UserOutput: ${this.state.lastOutputSpeech}`;
      this.conversationHistory = [
        ...this.conversationHistory,
        [Date.now(), newMessage]
      ];
    }
    updateMessageHistory(sources) {
      const [, currentSentence] = splitLastSentence(this.state.text);
      if (sources.length === 0 || currentSentence.length <= MIN_MESSAGE_LENGTH) {
        return;
      }
      const now = Date.now();
      let newMessageHistory = [...this.state.messageHistory];
      if (newMessageHistory.length === 0) {
        newMessageHistory.push([
          currentSentence,
          getUserInputPrefix(currentSentence),
          now
        ]);
        this.state.messageHistory = newMessageHistory;
        return;
      }
      const [lastSentence, lastPrefix] = newMessageHistory[newMessageHistory.length - 1];
      const currentPrefix = getUserInputPrefix(currentSentence);
      let prefix = "";
      if (sources[0].kind === "SENTENCE_HISTORY" /* SENTENCE_HISTORY */ || sources[0].kind === "SUGGESTED_SENTENCE" /* SUGGESTED_SENTENCE */ || sources[0].kind === "SUGGESTED_WORD" /* SUGGESTED_WORD */ || lastSentence.startsWith(currentSentence) || currentSentence.startsWith(lastSentence) && lastSentence.length - currentSentence.length < MAX_EDIT_DIFF_LENGTH) {
        newMessageHistory.pop();
        prefix = currentPrefix.length > lastPrefix.length ? currentPrefix : lastPrefix;
      } else {
        prefix = currentPrefix;
      }
      newMessageHistory.forEach(([sentence, oldPrefix]) => {
        if (sentence === currentSentence && oldPrefix.startsWith(prefix)) {
          prefix = oldPrefix;
        }
      });
      newMessageHistory = newMessageHistory.filter(
        ([sentence]) => sentence !== currentSentence
      );
      newMessageHistory.push([currentSentence, prefix, now]);
      newMessageHistory.slice(-MESSAGE_HISTORY_LIMIT);
      this.state.messageHistory = newMessageHistory;
    }
    // Experimental implementation of searching suggestions from history.
    searchSuggestionsFromMessageHistory() {
      const [preceedingSentences, currentSentence] = splitLastSentence(
        this.state.text
      );
      if (!currentSentence) {
        return null;
      }
      const candidates = this.state.messageHistory.filter(
        ([sentence, prefix]) => {
          return sentence.length >= MIN_SUGGESTION_LENGTH && sentence !== currentSentence && (prefix.startsWith(currentSentence) || sentence.startsWith(currentSentence));
        }
      );
      if (candidates.length === 0) {
        return null;
      }
      return preceedingSentences + candidates[candidates.length - 1][0];
    }
    updateSentences(suggestions) {
      if (!this.stateInternal.sentenceSmallMargin) {
        suggestions = suggestions.slice(0, LARGE_MARGIN_LINE_LIMIT);
      }
      this.suggestions = suggestions.map((s6) => {
        s6.value = normalize(s6.value);
        return s6;
      });
    }
    updateWords(words) {
      this.words = words.map((w2) => normalize(w2));
    }
    /**
     * Returns delay in ms before calling fetchSuggestions() depending on recent
     * qps of updateSuggestions(). Returns 0 when qps = 1.
     */
    delayBeforeFetchMs() {
      return Math.min(150 * (this.prevCallsMs.length - 1), 300);
    }
    async updateSuggestions() {
      window.clearTimeout(this.timeoutId);
      const now = Date.now();
      this.prevCallsMs.push(now);
      this.prevCallsMs = this.prevCallsMs.filter((item) => item > now - 1e3);
      if (this.isBlank()) {
        this.apiClient.abortFetch();
        this.isLoading = false;
        this.suggestions = [];
        this.words = [];
        return;
      }
      this.timeoutId = window.setTimeout(async () => {
        this.inFlightRequests++;
        this.isLoading = true;
        const [firstHalf, secondHalf] = splitLastFewSentencesForLLM(
          this.stateInternal.text
        );
        const result = await this.apiClient.fetchSuggestions(
          secondHalf,
          this.stateInternal.lang.promptName,
          this.stateInternal.model,
          {
            sentenceMacroId: this.state.features.sentenceMacroId ?? this.stateInternal.sentenceMacroId,
            wordMacroId: this.state.features.wordMacroId ?? this.stateInternal.wordMacroId,
            persona: this.stateInternal.persona,
            lastInputSpeech: this.state.lastInputSpeech,
            lastOutputSpeech: this.state.lastOutputSpeech,
            conversationHistory: this.conversationHistory.map(([, s6]) => s6).join("\n"),
            sentenceEmotion: this.state.emotion
          }
        );
        this.inFlightRequests--;
        if (this.inFlightRequests === 0) {
          this.isLoading = false;
        }
        if (!result) {
          return;
        }
        const [sentenceValues, words] = result;
        const sentences = sentenceValues.map(
          (s6) => new SentenceSuggestion(
            "LLM" /* LLM */,
            firstHalf + ignoreUnnecessaryDiffs(secondHalf, s6)
          )
        );
        this.updateSentences(sentences);
        this.updateWords(words);
        this.requestUpdate();
      }, this.delayBeforeFetchMs());
    }
    /**
     * Composes a sentence updated based on the incoming character.
     * @param currentSentence The current sentence to update.
     * @param incomingCharacter The character to append or a control character.
     * @returns The updated sentence after processing the incoming character.
     */
    static composeUpdatedSentence(currentSentence, incomingCharacter) {
      if (incomingCharacter === SMALL_KANA_TRIGGER) {
        const lastCharacter = currentSentence.slice(-1)[0];
        if ([...STEGANA.keys()].includes(lastCharacter)) {
          return currentSentence.slice(0, -1) + STEGANA.get(lastCharacter);
        } else if ([...STEGANA_INVERT.keys()].includes(lastCharacter)) {
          return currentSentence.slice(0, -1) + STEGANA_INVERT.get(lastCharacter);
        } else {
          return currentSentence;
        }
      }
      return currentSentence + incomingCharacter;
    }
    onCharacterSelect(e10) {
      if (!this.textField) return;
      const normalized = normalize(
        PvAppElement.composeUpdatedSentence(this.textField.value, e10.detail),
        this.textField.isLastInputSuggested()
      );
      this.textField.setTextFieldValue(normalized, [InputSource.CHARACTER]);
    }
    onSuggestionSelect(e10) {
      const [value, index, source] = e10.detail;
      const kind = source === "HISTORY" /* HISTORY */ ? "SENTENCE_HISTORY" /* SENTENCE_HISTORY */ : "SUGGESTED_SENTENCE" /* SUGGESTED_SENTENCE */;
      this.textField?.setTextFieldValue(value, [{ kind, index }]);
    }
    onSuggestedWordClick(word) {
      const text = this.textField?.value ?? "";
      const concat = this.stateInternal.lang.appendWord(text, word);
      const normalized = normalize(concat);
      this.textField?.setTextFieldValue(normalized, [InputSource.SUGGESTED_WORD]);
    }
    onSentenceTypeSelected(e10) {
      this.state.emotion = e10.composedPath()[0].selected;
      this.updateSuggestions();
    }
    onSettingClick() {
      this.settingPanel.show();
    }
    onUndoClick() {
      this.textField?.textUndo();
    }
    onBackspaceClick() {
      this.textField?.textBackspace();
    }
    onDeleteClick() {
      this.textField?.textDelete();
      if (this.sentenceEmotionButtons) {
        this.sentenceEmotionButtons.forEach((button) => {
          button.removeAttribute("active");
        });
      }
    }
    switchLanguage() {
      this.state.lang = LANGUAGES[this.state.checkedLanguages[this.languageIndex]];
      this.keyboardIndex = 0;
      this.state.keyboard = this.state.lang.keyboards[this.keyboardIndex];
      this.emotions = this.stateInternal.lang.emotions;
      this.state.emotion = "";
      if (this.sentenceTypeSelector) {
        this.sentenceTypeSelector.selected = "";
      }
      this.state.updateInitialPhrasesForCurrentLanguage();
      this.updateSuggestions();
      if (this.languageName) {
        this.languageName.setAttribute("active", "true");
        setTimeout(() => {
          this.languageName?.removeAttribute("active");
        }, 750);
      }
    }
    onLanguageChangeClick() {
      this.languageIndex = (this.languageIndex + 1) % this.state.checkedLanguages.length;
      this.switchLanguage();
    }
    onKeyboardChangeClick() {
      this.keyboardIndex = (this.keyboardIndex + 1) % this.state.lang.keyboards.length;
      this.state.keyboard = this.state.lang.keyboards[this.keyboardIndex];
      this.updateSuggestions();
    }
    onContentCopyClick() {
      this.textField?.contentCopy();
    }
    onKeypadHandlerClick() {
    }
    onSnackbarClose() {
      if (this.textField) {
        this.textField.addToInputHistory(this.textField.value, [
          InputSource.SNACK_BAR
        ]);
      }
    }
    // TODO: Call this event handler whenever the dialog is closed.
    onOkClick() {
      const index = this.state.checkedLanguages.findIndex(
        (label) => LANGUAGES[label] === this.state.lang
      );
      if (index === -1) {
        this.languageIndex = 0;
        this.switchLanguage();
      }
    }
    render() {
      const words = this.isBlank() ? this.stateInternal.initialPhrases : this.words;
      const bodyOfWordSuggestions = words.map(
        (word) => !word ? "" : x`
            <li>
              <pv-button
                label="${word}"
                rounded
                @click="${() => this.onSuggestedWordClick(word)}"
              ></pv-button>
            </li>
          `
      );
      const bodyOfSentenceSuggestions = this.suggestions.map((suggestion) => {
        if (!this.textField?.value) return "";
        const text = normalize(this.textField.value);
        const sharedOffset = getSharedPrefix([suggestion.value, text]);
        return x` <li
        class="${this.stateInternal.sentenceSmallMargin ? "tight" : ""}"
      >
        <pv-suggestion-stripe
          .state=${this.stateInternal}
          .offset="${sharedOffset}"
          .suggestion="${suggestion}"
          @select="${this.onSuggestionSelect}"
        ></pv-suggestion-stripe>
      </li>`;
      });
      return x`
      <div class="container">
        <pv-functions-bar
          .state=${this.stateInternal}
          @undo-click=${this.onUndoClick}
          @backspace-click=${this.onBackspaceClick}
          @delete-click=${this.onDeleteClick}
          @language-change-click=${this.onLanguageChangeClick}
          @keyboard-change-click=${this.onKeyboardChangeClick}
          @content-copy-click=${this.onContentCopyClick}
          @setting-click=${this.onSettingClick}
          @snackbar-close=${this.onSnackbarClose}
          @output-speech-click=${this.updateConversationHistory}

        ></pv-functions-bar>
        <div class="main">
          ${this.state.features.featureEnableSentenceEmotion ? x`
                <pv-sentence-type-selector
                  .sentenceTypes=${this.emotions}
                  @select=${this.onSentenceTypeSelected}
                ></pv-sentence-type-selector>
              ` : ""}
          <div class="keypad">
            <pv-character-input
              .state=${this.stateInternal}
              @character-select=${this.onCharacterSelect}
              @keypad-handler-click=${this.onKeypadHandlerClick}
            ></pv-character-input>
            <div class="suggestions">
              <ul class="word-suggestions">
                ${bodyOfWordSuggestions}
              </ul>
              <ul class="sentence-suggestions">
                ${bodyOfSentenceSuggestions}
              </ul>
              <div class="loader ${this.isLoading ? "loading" : ""}">
                <md-circular-progress indeterminate></md-circular-progress>
              </div>
            </div>
          </div>
          <div>
            <pv-textarea-wrapper
              .state=${this.stateInternal}
              @text-update=${(e10) => {
        this.updateSuggestions();
        this.updateMessageHistory(e10.detail.sources);
      }}
            ></pv-textarea-wrapper>
          </div>
          <div class="language-name">${this.stateInternal.lang.render()}</div>

        </div>
        ${this.state.features.featureEnableSpeechInput && this.state.enableConversationMode ? x`<div class="conversation-history-container">
              <pv-conversation-history
                .history=${this.conversationHistory}
              ></pv-conversation-history>
            </div>` : ""}
      </div>

      <pv-snackbar @closed=${this.onSnackbarClose}></pv-snackbar>
      <pv-setting-panel
        .state=${this.stateInternal}
        @ok-click=${this.onOkClick}
      ></pv-setting-panel>
    `;
    }
  };
  PvAppElement.styles = pvAppStyle;
  __decorateClass([
    n3({ type: Array })
  ], PvAppElement.prototype, "suggestions", 2);
  __decorateClass([
    n3({ type: Array })
  ], PvAppElement.prototype, "words", 2);
  __decorateClass([
    n3()
  ], PvAppElement.prototype, "isLoading", 2);
  __decorateClass([
    e4("pv-textarea-wrapper")
  ], PvAppElement.prototype, "textField", 2);
  __decorateClass([
    e4("pv-functions-bar")
  ], PvAppElement.prototype, "functionsBar", 2);
  __decorateClass([
    e4("pv-setting-panel")
  ], PvAppElement.prototype, "settingPanel", 2);
  __decorateClass([
    n3({ type: String, attribute: "feature-locale" })
  ], PvAppElement.prototype, "locale", 2);
  __decorateClass([
    n3({ type: String, attribute: "feature-sentence-macro-id" })
  ], PvAppElement.prototype, "sentenceMacroId", 2);
  __decorateClass([
    n3({ type: String, attribute: "feature-languages" })
  ], PvAppElement.prototype, "languageLabels", 2);
  __decorateClass([
    e4(".language-name")
  ], PvAppElement.prototype, "languageName", 2);
  __decorateClass([
    n3({ type: Array })
  ], PvAppElement.prototype, "conversationHistory", 2);
  __decorateClass([
    n3({ type: Array })
  ], PvAppElement.prototype, "emotions", 2);
  __decorateClass([
    n3({ type: String, attribute: "feature-storage-domain" })
  ], PvAppElement.prototype, "featureStorageDomain", 2);
  __decorateClass([
    n3({ type: Boolean, attribute: "feature-enable-speech-input" })
  ], PvAppElement.prototype, "featureEnableSpeechInput", 2);
  __decorateClass([
    n3({ type: Boolean, attribute: "feature-enable-sentence-emotion" })
  ], PvAppElement.prototype, "featureEnableSentenceEmotion", 2);
  __decorateClass([
    e4("pv-sentence-type-selector")
  ], PvAppElement.prototype, "sentenceTypeSelector", 2);
  __decorateClass([
    r5("[emotion]")
  ], PvAppElement.prototype, "sentenceEmotionButtons", 2);
  __decorateClass([
    e4("pv-snackbar")
  ], PvAppElement.prototype, "snackbar", 2);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onCharacterSelect", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onSuggestionSelect", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onSuggestedWordClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onSentenceTypeSelected", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onSettingClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onUndoClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onBackspaceClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onDeleteClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onLanguageChangeClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onKeyboardChangeClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onContentCopyClick", 1);
  __decorateClass([
    playClickSound()
  ], PvAppElement.prototype, "onKeypadHandlerClick", 1);
  PvAppElement = __decorateClass([
    t("pv-app"),
    localized()
  ], PvAppElement);
})();
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/aria/aria.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/delegate.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/circular-progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/circular-progress-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/circular-progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

signal-polyfill/dist/index.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
  (**
   * @license
   * Copyright 2024 Bloomberg Finance L.P.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@lit-labs/signals/lib/signal-watcher.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/lib/watch.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/lib/html-tag.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/index.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/locale-status-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/str-tag.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/types.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/default-msg.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/localized-controller.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/localized-decorator.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/deferred.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/fnv1a64.js:
  (**
   * @license
   * Copyright 2014 Travis Webb
   * SPDX-License-Identifier: MIT
   *)

@lit/localize/internal/id-generation.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/runtime-msg.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/init/runtime.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/init/transform.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/lit-localize.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/icon/internal/icon.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/icon/internal/icon-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/icon/icon.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/element-internals.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/form-submitter.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/is-rtl.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/icon-button.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/standard-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/icon-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/form-label-activation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/redispatch-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/constraint-validation.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/form-associated.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/checkbox-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/checkbox.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menuitem/menu-item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/menuItemController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/selectOptionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/button.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/text-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/text-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/text-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/dispatch-hooks.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/focusable.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/primary-tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/primary-tab-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tab-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/primary-tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/internal/divider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/internal/divider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/divider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tabs.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tabs-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/tabs.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/controller/string-converter.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/on-report-validity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/text-field-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/filled-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/filled-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-navigation-helpers.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/surfacePositionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/typeaheadController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/menu.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/select-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/animations.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/dialog.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/dialog-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/dialog.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/forced-colors-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/slider/internal/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/slider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
