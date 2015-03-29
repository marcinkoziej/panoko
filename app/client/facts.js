// Generated by CoffeeScript 1.4.0
(function() {

  if (typeof Panoko === "undefined" || Panoko === null) {
    window.Panoko = {};
  }

  Panoko.SearchQueryView = React.createFactory(React.createClass({
    mixins: [Panoko.QueryMixin, Panoko.SyncState, Panoko.PaneView],
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
            kind: 'query'
          }, {
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
          this.thead(['engine', 'query', 'path']), DOM.tbody(this.state.facts.map(function(fact) {
            return DOM.tr({
              key: fact._id
            }, [
              Panoko.TimeField({
                fact: fact
              }), Panoko.IPField({
                fact: fact
              }), DOM.td({
                key: 'kind'
              }, "" + fact.provider), DOM.td({
                key: 'query'
              }, "" + fact.query), DOM.td({
                key: 'path'
              }, "" + fact.path)
            ]);
          }))
        ])
      ]);
    }
  }));

  Panoko.CredView = React.createFactory(React.createClass({
    mixins: [Panoko.QueryMixin, Panoko.SyncState, Panoko.PaneView],
    getInitialState: function() {
      return {
        facts: []
      };
    },
    getQuery: function(query) {
      var qrx;
      qrx = RegExp(query);
      return {
        $and: [
          {
            kind: 'cred',
            $or: [
              {
                id: qrx
              }, {
                email: qrx
              }, {
                password: qrx
              }
            ]
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
        "class": 'cred-pane'
      }, [
        DOM.table({
          "class": 'table'
        }, [
          this.thead(['provider', 'username', 'email', 'password']), DOM.tbody(this.state.facts.map(function(fact) {
            return DOM.tr({
              key: fact._id
            }, [
              Panoko.TimeField({
                fact: fact
              }), Panoko.IPField({
                fact: fact
              }), DOM.td({
                key: 'provider'
              }, "" + fact.provider), DOM.td({
                key: 'username'
              }, "" + fact.id), DOM.td({
                key: 'email'
              }, "" + fact.email), DOM.td({
                key: 'password'
              }, "" + fact.password)
            ]);
          }))
        ])
      ]);
    }
  }));

  Panoko.FacebookMessageView = React.createFactory(React.createClass({
    mixins: [Panoko.QueryMixin, Panoko.SyncState, Panoko.PaneView],
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
    just_recipients: function(frm, frm_name, to, to_name) {
      to = _.reject(to, (function(x) {
        return x === frm;
      }));
      return Panoko.FacebookUsers({
        names: to_name,
        fbids: to
      });
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
        this.thead(['from', 'to', 'content']), DOM.tbody({
          key: 'tbody'
        }, this.state.facts.map(function(fact) {
          return DOM.tr({
            key: fact._id
          }, [
            Panoko.TimeField({
              fact: fact
            }), Panoko.IPField({
              fact: fact
            }), Panoko.FacebookUsers({
              fbids: [fact.frm],
              names: fact.frm_name
            }), _this.just_recipients(fact.frm, fact.frm_name, fact.to, fact.to_name), DOM.td({
              key: 'content'
            }, "" + fact.content)
          ]);
        }))
      ]));
    }
  }));

}).call(this);
