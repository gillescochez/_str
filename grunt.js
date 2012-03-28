module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      banner: '/*! github.com/gillescochez/_str */'
    },
    concat: {
      dist: {
        src: [
            '<banner>',
            'src/build/head.js',
            'src/core.js',
            'src/basic.js',
            'src/html.js',
            'src/helper.js',
            'src/build/foot.js'
        ],
        dest: 'dist/_str.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/_str.js'],
        dest: 'dist/_str.min.js'
      }
    }
  });

  grunt.registerTask('default', 'concat min');
};
