import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ToolCollectionDisplay } from './tools/ToolCollectionDisplay';

export const Sidebar = () => {
  return (
    <Tabs
      defaultActiveKey="tools"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="tools" title="Tools">
        <ToolCollectionDisplay />
      </Tab>
      <Tab eventKey="local-mcp" title="MCP servers">
        Coming soon!
      </Tab>
    </Tabs>
  );
}