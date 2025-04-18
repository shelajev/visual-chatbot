import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactMarkdown from 'react-markdown';

export function MessageDisplay({ message, onSelect }) {
  return (
    <Row className="border-bottom py-2">
      <Col sm={2} className="fw-bold">{ message.role }</Col>
      <Col>
      { message.tool_calls && (
          <>
            <div>
              <strong>Tool execution request</strong>
            </div>
            <ul>
              { message.tool_calls.map((toolCall, index) => (
                <li key={index}>
                  {toolCall.function.name}
                  <ul>
                    <li>Call ID: { toolCall.id }</li>
                    <li>Arguments: { toolCall.function.arguments }</li>
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}

        { message.role === "tool" && (
          <div>
            <strong>Tool execution result</strong>
            &nbsp; <em><small>{ message.tool_call_id }</small></em>
          </div>
        )}

        {message.content ? (
          <ReactMarkdown
            components={{
              p({ children, ...props }) {
                return <p style={{ whiteSpace: "pre-wrap"}}>{ children }</p>
              }
            }}
          >
            { 
              message.content.length > 500 && message.role === "tool" ? 
                `${message.content.substring(0, 500)}...` : 
                message.content
            }
          </ReactMarkdown>
        ) : (<em>No content in this message</em>)}
      </Col>
      <Col sm={1} className="text-center">
        <div onClick={onSelect}>ℹ️</div>
      </Col>
    </Row>
  );
}