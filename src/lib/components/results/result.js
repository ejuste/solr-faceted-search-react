import PropTypes from "prop-types";
import React from "react";
import cx from "classnames";
import ReactHtmlParser from "react-html-parser";

class Result extends React.Component {
  renderValue(field, doc, highlight) {
    const highlightedValues = this.highlightedValuesFrom(field, highlight);
    return highlightedValues ? highlightedValues : this.rawValuesFrom(doc, field);
  }

  rawValuesFrom(doc, field) {
    return []
      .concat(doc[field] || null)
      .filter(v => v !== null)
      .join(", ");
  }

  highlightedValuesFrom(field, highlight) {
    const highlights = highlight[field];
    if (highlights && highlights.length > 0) {
      return highlights.map(value => ReactHtmlParser(value));
    }
    return null;
  }

  render() {
    const { bootstrapCss, doc, fields, highlight } = this.props;

    return (
      <li
        className={cx({ "list-group-item": bootstrapCss })}
        onClick={() => this.props.onSelect(doc)}
      >
        <ul>
          {fields.filter(field => field.field !== "*").map((field, i) => (
            <li key={i}>
              <label>{field.label || field.field}</label>
              {this.renderValue(field.field, doc, highlight)}
            </li>
          ))}
        </ul>
      </li>
    );
  }
}

Result.propTypes = {
  bootstrapCss: PropTypes.bool,
  doc: PropTypes.object,
  fields: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  highlight: PropTypes.object
};

export default Result;
