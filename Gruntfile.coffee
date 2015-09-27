'use strict'

module.exports = (grunt) ->
  require('jit-grunt') grunt
  require('time-grunt') grunt

  grunt.file.defaultEncoding = 'utf8'

  grunt.initConfig
    project:
      'prod': 'build'
      'dev': 'dev'
      'tmp': 'tmp'
      'coffee': 'coffee'
      'jade': 'jade'
      'pre': 'stylus'

    xo:
      options:
        quiet: true
        ignores: []
      target: ['es6/**/*.js']

    coffee: compile:
      options:
        bare: true
      files: [
        expand: true
        flatten: false
        cwd: '<%= project.coffee %>'
        src: [ '**/*.coffee' ]
        dest: '<%= project.dev %>/js'
        ext: '.js'
      ]

    babel:
      compile:
        options:
          sourceMap: false
          modules: 'umd'
        files: [
          expand: true
          flatten: false
          cwd: 'es6'
          src: [ '**/*.js' ]
          dest: '<%= project.dev %>/js/es5'
          ext: '.js'
        ]

    jade:
      js:
        options:
          amd: true
          client: true
          namespace: false
        files: [
          expand: true
          flatten: true
          cwd: '<%= project.jade %>/js'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>/js/templates'
          ext: '.js'
        ]
      html:
        options: pretty: true
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.jade %>/html'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>'
          ext: '.html'
        ]
      build:
        options:
          pretty: false
          data: build: true
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.jade %>/html'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>'
          ext: '.html'
        ]

    watch:
      script:
        files: [ '<%= project.coffee %>/**/*.coffee', 'es6/**/*.js' ]
        tasks: [ 'scripts' ]
      pre:
        files: [ '<%= project.pre %>/**/*' ]
        tasks: [ 'styles' ]
      jadeToHtml:
        files: [ '<%= project.jade %>/html/**/*.jade' ]
        tasks: [ 'jade:html' ]
      jadeToJs:
        files: [ '<%= project.jade %>/js/**/*.jade' ]
        tasks: [ 'jade:js' ]

    browserSync:
      dev:
        bsFiles: src: '<%= project.dev %>/css/*.css'
        options:
          notify: true
          watchTask: true
          port: 8183
          server: baseDir: [ '<%= project.dev %>' ]
      dist: options:
        notify: false
        watchTask: false
        port: 8184
        server: baseDir: [ '<%= project.prod %>' ]

    requirejs: almond: options:
      optimize: 'uglify2'
      uglify2:
        warnings: false
        compress:
          sequences: true
          properties: true
          drop_debugger: true
          unused: true
          drop_console: true
      optimizeCss: 'standard'
      generateSourceMaps: true
      keepAmdefine: true
      preserveLicenseComments: false
      findNestedDependencies: true
      useStrict: true
      baseUrl: '<%= project.dev %>/js/lib'
      mainConfigFile: '<%= project.dev %>/js/config.js'
      name: '../../../node_modules/almond/almond',
      include: [ '../main' ]
      out: '<%= project.prod %>/js/main.js'
    cssmin: dynamic:
      options:
        keepSpecialComments: 0
        report: 'gzip'
      files: [ {
        expand: true
        flatten: false
        cwd: '<%= project.dev %>/css'
        src: [ '**/*.css' ]
        dest: '<%= project.prod %>/css'
        ext: '.css'
      } ]

    minifyHtml: dynamic:
      options:
        comments: false
        conditionals: true
        spare: false
        quotes: true
        cdata: false
        empty: false
      files: [ {
        expand: true
        cwd: '<%= project.dev %>'
        src: [ '**/*.html' ]
        dest: '<%= project.prod %>'
      } ]

    concurrent: dev: [
      'scripts'
      'styles'
      'jade:js'
      'jade:html'
    ]

    clean:
      dist: [ '<%= project.prod %>' ]
      tmp: [ '<%= project.tmp %>' ]
      es5: [ 'es5' ]

    copy:
      dist:
        src: '<%= project.dev %>/favicon.ico'
        dest: '<%= project.prod %>/favicon.ico'
      es5:
        files: [
          expand: true
          cwd: '<%= project.dev %>/js/es5'
          src: ['**']
          dest: 'es5'
        ]
      es5css:
        src: '<%= project.dev %>/css/tooltip.css'
        dest: 'es5/tooltip.css'

    stylus:
      dev:
        options:
          compress: false
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.pre %>'
          src: ['*.styl']
          dest: '<%= project.dev %>/css'
          ext: '.css'
        ]

    postcss:
      dev:
        options:
          processors: [
            require('autoprefixer')(browsers: 'last 2 versions')
          ]
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.dev %>/css'
          src: ['*.css']
          dest: '<%= project.dev %>/css'
          ext: '.css'
        ]

    symlink:
      options:
        overwrite: false
      require:
        src: 'node_modules/requirejs/require.js'
        dest: '<%= project.dev %>/js/lib/require.js'
      jadeRuntime:
        src: 'node_modules/grunt-contrib-jade/node_modules/jade/runtime.js'
        dest: '<%= project.dev %>/js/lib/jade.js'
      jquery:
        src: 'node_modules/jquery/dist/jquery.js'
        dest: '<%= project.dev %>/js/lib/jquery.js'
      getStyleProperty:
        src: 'node_modules/desandro-get-style-property/get-style-property.js'
        dest: [
          '<%= project.dev %>/js/lib/get-style-property/get-style-property.js'
        ].join()

  grunt.registerTask 'default', [
    'clean:tmp'
    'symlink'
    'concurrent:dev'
  ]
  grunt.registerTask 'scripts', [
    'xo'
    'coffee'
    'babel'
  ]
  grunt.registerTask 'build', [
    'clean:dist'
    'default'
    'jade:build'
    'requirejs'
    'cssmin'
    'minifyHtml'
    'copy'
  ]
  grunt.registerTask 'dist', [
    'clean:dist'
    'clean:es5'
    'default'
    'copy:es5'
    'copy:es5css'
  ]
  grunt.registerTask 'serve', [
    'default'
    'browserSync:dev'
    'watch'
  ]
  grunt.registerTask 'serve:prod', [
    'build'
    'browserSync:dist'
  ]
  grunt.registerTask 'styles', [
    'stylus'
    'postcss'
  ]
  return
