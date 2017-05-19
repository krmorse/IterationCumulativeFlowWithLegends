Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: 'fit',

    config: {
        defaultSettings: {
            show_legend: true
        }
    },

    afterRender: function () {
        this.callParent(arguments);

        var showChrome = this.getSetting('show_legend') ? 'show' : 'hide';
        var timeboxScope = this.getContext().getTimeboxScope();
        var standardReportConfig = {
            xtype: 'rallystandardreport',
            project: Rally.util.Ref.getRelativeUri(this.getContext().getProject()),
            projectScopeUp: this.getContext().getProjectScopeUp(),
            projectScopeDown: this.getContext().getProjectScopeDown(),
            height: this.getHeight(),
            width: this.getWidth(),
            reportConfig: {
                report: Rally.ui.report.StandardReport.Reports.IterationCumulativeFlowDiagram,
                legend: showChrome,
                subchart: showChrome,
                x_axis_label: showChrome,
                y_axis_label: showChrome
            }
        };

        if (timeboxScope && timeboxScope.getType() === 'iteration') {
            standardReportConfig.iteration = timeboxScope.getRecord().raw;
        }
        
        this.add(standardReportConfig);
    }
});
