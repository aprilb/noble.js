var each = require("each");

each({
    "alert":        require("./Alert"),
    "asset":        require("./Asset"),
    "community":    require("./Community"),
    "customer":     require("./Customer"),
    "event":        require("./Event"),
    "group":        require("./Group"),
    "hoursSet":     require("./HoursSet"),
    "hours":        require("./Hours"),
    "news":         require("./News"),
    "moderation":   require("./Moderation"),
    "opportunity":  require("./Opportunity"),
    "organization": require("./Organization"),
    "project":      require("./Project"),
    "submission":   require("./Submission"),
    "url":          require("./Url"),
    "user":         require("./User"),
    "vertex":       require("./Vertex")
}, function (method, Constructor) {
    exports[Constructor.name] = Constructor;
    exports[method] = function (id) {
        return new Constructor(this, id);
    };
});
