"use strict";

window.GettoDetect = function(opts) {
  var version_to_path = function(version){ return "/" + version + "/index.html" };

  if (opts && opts.version_to_path) {
    version_to_path = opts.version_to_path;
  }

  var next_patch = function(v) {
    v = v.slice(0.3);
    if (v.length > 2) {
      v[2] = parseInt(v[2]) + 1;
    }
    return v.join(".");
  };
  var next_minor = function(v) {
    v = v.slice(0,2);
    if (v.length > 1) {
      v[1] = parseInt(v[1]) + 1;
    }
    v.push(0);
    return v.join(".");
  };
  var next_major = function(v) {
    v = v.slice(0,1);
    if (v.length > 0) {
      v[0] = parseInt(v[0]) + 1;
    }
    v.push(0);
    v.push(0);
    return v.join(".");
  };

  var next_versions = function(version) {
    var info = version.split(".");

    return [
      next_patch(info),
      next_minor(info),
      next_major(info),
    ];
  };

  var detect = function(target_versions, cb, cb_notfound) {
    var found = [];
    var map = {};

    var find = function(versions, detected){
      if (versions.length == 0) {
        if (found.length > 0) {
          var next = found.pop();
          found = [];
          find(next_versions(next), next);
        } else {
          if (detected) {
            cb(version_to_path(detected));
          } else {
            if (cb_notfound) {
              cb_notfound();
            }
          }
        }
        return;
      }

      var version = versions.shift();

      if (!map[version]) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4) {
            var exists = (xhr.status == 200);

            map[version] = {exists: exists};

            if (exists) {
              found.push(version);
            }

            find(versions, detected);
          }
        };
        xhr.open("HEAD", version_to_path(version), true);
        xhr.send();
      } else {
        if (map[version].exists) {
          found.push(version);
        }

        find(versions, detected);
      }
    };

    find(target_versions);
  };

  return {
    from_current_version: function(current, cb, cb_notfound) {
      detect(next_versions(current), cb, cb_notfound);
    },
  };
};
