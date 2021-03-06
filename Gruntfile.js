"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/style.css": "sass/style.scss"
        }
      }
    },
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers:
              [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
              ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "css/*.css"
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["img/*.{png,jpg,gif}"]
        }]
      }
    },
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["img/*.svg"]
        }]
      }
    },
    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          "css/style.css": ['css/style.css']
        }
      }
    },
    csso: {
      compress: {
        options: {
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },
    watch: {
      html: {
        files: ["*.html"],
       // tasks: ["copy:html"]
      },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("optimize", [
    "imagemin",
    "svgmin"
  ]);
  
  
  grunt.registerTask("build", [
    "csscomb",
    "sass",
    "postcss",    
    "csso"
  ]);
};