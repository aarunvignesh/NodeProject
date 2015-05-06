require.config({
    baseUrl:"App",
    paths: {
        Underscore:"../Scripts/Underscore",
        jquery: "../Scripts/jquery-2.1.1",
        paper: "../Scripts/paper-full",
        bootstrap: "../Scripts/bootstrap-3.3.2-dist/js/bootstrap.min",
        backbone: "../Scripts/Backbone",
        text: "../Scripts/Text",
        less: "../Scripts/less.js-master/dist/less.min",
        offline: "../Scripts/offline.min",
        game: "../Scripts/snake",
        xslt: "../Scripts/xslt",
        jqueryxslt: "../Scripts/jquery.xslt",
        socket:"../Scripts/Socket",
        resize:"../Scripts/Jquery-Resizable"
    },
    shim: {
       jquery: { exports: "$" },
       paper: { exports: "paper" },
       Underscore: { exports: "_" },
        backbone: { deps: ["jquery","Underscore"], exports: "Backbone" },
        text: { exports: "text" },
        bootstrap: { deps: ["jquery"], exports: "bootstrap" },
        jqueryxslt:{deps:["jquery"],exports:"jqueryxslt"},
        game: {deps:['offline'],exports:"game"}
        , less: {exports:"less"},
        resize:{deps:["jquery"],exports:"resize"}
    }
});
requirejs(["View"])