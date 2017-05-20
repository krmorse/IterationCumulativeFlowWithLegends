Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: 'fit',

    afterRender: function () {
        this.callParent(arguments);

        this._renderReport();
    },

    onTimeboxScopeChange: function() {
        this.callParent(arguments);

        this._renderReport();
    },

    _renderReport: function() {
        if (this.down('rallystandardreport')) {
            this.down('rallystandardreport').destroy();
        }

        var showChrome = 'show';
        var timeboxScope = this.getContext().getTimeboxScope();
        var standardReportConfig = {
            xtype: 'rallystandardreport',
            project: Rally.util.Ref.getRelativeUri(this.getContext().getProject()),
            projectScopeUp: this.getContext().getProjectScopeUp(),
            projectScopeDown: this.getContext().getProjectScopeDown(),
            height: this.getHeight() + 150,
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
