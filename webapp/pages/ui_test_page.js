import React from 'react';

import { TimeText, display_duration } from 'es6!display/time';
import { StatusDot, StatusMark } from 'es6!display/status_indicators';
import { Error } from 'es6!display/errors';
import Grid from 'es6!display/grid';
import { InlineLoading, RandomLoadingMessage } from 'es6!display/loading';
import { Menu1, Menu2 } from 'es6!display/menus';
import SectionHeader from 'es6!display/section_header';
import { Popover, OverlayTrigger } from 'react_bootstrap';

import colors from 'es6!utils/colors';

var UITestPage = React.createClass({
  render: function() {
    var renderables = {};
    
    var popover = <Popover>
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>;

    renderables["Popover"] = <div>
      <OverlayTrigger 
        trigger='hover' 
        placement='bottom' 
        overlay={popover}>
        <div className="inlineBlock">Hover over me!</div>
      </OverlayTrigger>
    </div>;

    // TimeText
    renderables["TimeText"] = <div>
      <TimeText 
        className="block paddingBottomS" 
        time={moment.utc().local().toString()} 
      />
      <TimeText className="block" time="September 1, 2008 3:14 PM" />
      <div className="paddingTopS">
        {display_duration(57)}, 
        {display_duration(3742)}
      </div>
    </div>;

    // StatusDot
    renderables["StatusDot"] = <div>
      <statusdot result="passed" />
      <StatusDot result="failed" />
      <StatusDot result="unknown" />
      <StatusDot result="error" />
      <StatusDot result="passed" num={2} />
      <div>
        <StatusDot result="failed" size="big" />
      </div>
    </div>;

    renderables["StatusMark"] = <div>
      <StatusMark result="passed" />
      <StatusMark result="failed" />
      <StatusMark result="unknown" />
      <StatusMark result="error" />
      <StatusMark result="passed" num={2} />
      <div>
        <StatusMark result="failed" size="big" />
      </div>
    </div>;

    // Error

    renderables["Error"] = <div>
      <Error>An error has occurred. Let{"'"}s be cryptic.</Error>
    </div>;

    // TODO: AjaxError, NotLoaded, maybe. They're just wrappers...

    // Grid, SectionHeader

    var headers = ['Letter', 'Position'];
    var data = [['a', 1], ['e', 5], ['v', 22]];

    renderables["Grid"] = <div>
      <SectionHeader>Letters</SectionHeader>
      <Grid headers={headers} data={data} />
    </div>;

    // Menus
    var MenuRenderer = React.createClass({
      getInitialState: function() {
        return {
          selectedItem: 'Home',
        };
      },

      render: function() {
        var onclick = item => {
          this.setState({selectedItem: item});
        };

        var menu_props = {
          items: ["Home", "Section", "Another Section"],
          selectedItem: this.state.selectedItem,
          onClick: onclick
        };

        return React.createElement(this.props.cls, menu_props);
      }
    });
    
    renderables["Menu1"] = <MenuRenderer cls={Menu1} />;
    renderables["Menu2"] = <MenuRenderer cls={Menu2} />;

    // RandomLoadingMessage + InlineLoading

    renderables["RandomLoadingMessage"] = <div>
      <RandomLoadingMessage className="paddingBottomS" />
      <RandomLoadingMessage />
    </div>;

    renderables["InlineLoading"] = <div>
      <InlineLoading />
    </div>;
    // render everything

    var style = {
      paddingTop: "10px",
      borderTop: `1px solid ${colors.metalGray}`
    };

    var content = _.map(renderables, (v, k) =>
      <div>
        <h2 style={style}>{"<"+k+" />"}</h2>
        {v}
      </div>
    );

    return <div>
      Examples for stuff in display
      {content}
    </div>;
  }
});

export default UITestPage;