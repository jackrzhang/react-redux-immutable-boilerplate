import React from 'react';

import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-d"
    changePositionKey="ctrl-r"
    defaultPosition={'right'}
    defaultIsVisible={false}
    expandActionRoot
    expandStateRoot
  >
    <LogMonitor theme="nicinabox" />
  </DockMonitor>
);

export default DevTools;
