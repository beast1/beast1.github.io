//"use strict";
//
//module.exports = function(grunt) {
//
//  grunt.initConfig({
//    less: {
//      style: {
//        files: {
//          "css/style.css": "less/style.less"
//        }
//      }
//    },
//
//    postcss: {
//      style: {
//        options: {
//          processors: [
//            require("css-mqpacker")({
//              sort: true
//            }),
//            require('autoprefixer')({browsers: 
//            'last 2 versions'
//            })
//          ]
//        },
//        src: "css/*.css"
//      }
//    },
//
//    browserSync: {
//      server: {
//        bsFiles: {
//          src: [
//            "*.html",
//            "css/*.css"
//          ]
//        },
//        options: {
//          server: ".",
//          watchTask: true,
//          notify: false,
//          open: true,
//          cors: true,
//          ui: false
//        }
//      }
//    },
//
//    watch: {
//      style: {
//        files: ["less/**/*.less"],
//        tasks: ["less", "postcss"]
//      }
//    }
//  });
//  
//  grunt.loadNpmTasks("grunt-contrib-less");
//  grunt.loadNpmTasks("grunt-browser-sync");
//  grunt.loadNpmTasks("grunt-contrib-watch");
//  grunt.loadNpmTasks("grunt-postcss");
//
//  grunt.registerTask("default", ["less", "postcss", "browserSync", "watch"]);
//};

"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less"]
      }
    }
  });
  
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  
  grunt.registerTask("default", ["less", "watch"]);
};