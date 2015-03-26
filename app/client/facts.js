// Generated by CoffeeScript 1.4.0
(function() {

  if (typeof Panoko === "undefined" || Panoko === null) {
    window.Panoko = {};
  }

  Panoko.SearchQueryView = React.createFactory(React.createClass({
    mixins: [Panoko.QueryMixin, Panoko.SyncState],
    getInitialState: function() {
      return {
        facts: []
      };
    },
    getQuery: function(query) {
      var num, qrx;
      num = parseInt(query);
      qrx = RegExp(query);
      return {
        $and: [
          {
            kind: 'query',
            query: qrx
          }
        ]
      };
    },
    render: function() {
      var _this = this;
      if (!this.props.shown) {
        return DOM.div();
      }
      return DOM.div({
        "class": 'query-pane'
      }, [
        DOM.table({
          "class": 'table'
        }, [
          DOM.thead(DOM.tr([
            _.map(['engine', 'query'], function(fn) {
              return DOM.th({
                key: fn
              }, fn);
            })
          ])), DOM.tbody(this.state.facts.map(function(fact) {
            return DOM.tr({
              key: fact._id
            }, [
              DOM.td({
                key: 'kind'
              }, "" + fact.kind), DOM.td({
                key: 'query'
              }, "" + fact.query)
            ]);
          }))
        ])
      ]);
    }
  }));

  Panoko.FacebookMessageView = React.createFactory(React.createClass({
    mixins: [Panoko.QueryMixin, Panoko.SyncState],
    getInitialState: function() {
      return {
        facts: []
      };
    },
    getQuery: function(query) {
      var num, or_stmt, qrx;
      num = parseInt(query);
      qrx = RegExp(query);
      or_stmt = [];
      if (num !== NaN) {
        or_stmt = or_stmt.concat([
          {
            frm: num
          }, {
            to: num
          }
        ]);
      }
      or_stmt = or_stmt.concat([
        {
          content: qrx
        }, {
          frm_name: qrx
        }, {
          to_name: qrx
        }
      ]);
      return {
        $and: [
          {
            kind: 'message',
            $or: or_stmt
          }
        ]
      };
    },
    na: function(s) {
      if (s === void 0) {
        return 'N/A';
      }
      if (s === []) {
        return '(empty)';
      }
      return s;
    },
    render: function() {
      var _this = this;
      if (!this.props.shown) {
        return DOM.div();
      }
      return DOM.div({
        "class": 'facebook-messages-pane'
      }, DOM.table({
        "class": 'table'
      }, [
        DOM.thead({
          key: 'thead'
        }, DOM.tr([
          _.map(['from', 'to', 'content'], function(fn) {
            return DOM.th({
              key: fn
            }, fn);
          })
        ])), DOM.tbody({
          key: 'tbody'
        }, this.state.facts.map(function(fact) {
          return DOM.tr({
            key: fact._id
          }, [
            DOM.td({
              key: 'from'
            }, "" + (_this.na(fact.frm)) + " " + (_this.na(fact.frm_name))), DOM.td({
              key: 'to'
            }, "" + (_this.na(fact.to)) + ", " + (_this.na(fact.to_name))), DOM.td({
              key: 'content'
            }, "" + fact.content)
          ]);
        }))
      ]));
    }
  }));

}).call(this);
