import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { SELECTED } from '../../../constants.js';
import Top5 from './Top5';
import { UUID } from '../../Utils/UUID';

/* **************************************************
   Top5List component

   Displays selections for top 5
     -- selections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    data --
      [ key: 1,
        item: {
          field: 'field',  // different for each one
          selected:'selected'},
        {...},
      ]

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     previousAnswers
     title
     prompts
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onSave() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class Top5List extends React.Component {
  uuid = new UUID();

  state = {
    allItemsWithKeys: this.uuid.addKeys(this.props.prompts || []),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allItemsWithKeys !== this.state.allItemsWithKeys) {
      this.onChange();
    }
  }

  onclickClose = async () => {
    const { onSaveCB, onCloseModalCB } = this.props;
    const { allItemsWithKeys } = this.state;

    const newSelections = this.uuid.stripKeys(allItemsWithKeys);

    await onSaveCB(newSelections);
    await onCloseModalCB();
  };

  // keep store up to date (but don't save to DB yet)
  onChange = async () => {
    const { onUpdateCB } = this.props;
    const { allItemsWithKeys } = this.state;

    console.log('Items', allItemsWithKeys);

    const newSelections = this.uuid.stripKeys(allItemsWithKeys);

    await onUpdateCB(newSelections);
    console.log('onChange called');
  };

  filterSelected = (allItemsWithKeys) =>
    allItemsWithKeys.filter((itemWithKey) => itemWithKey.item.selected === SELECTED);

  update = (key, data) => {
    // console.log("update", key, data)
    const { allItemsWithKeys } = this.state;

    const newAllItemsWithKeys = allItemsWithKeys.map((item) =>
      item.key === key ? { key, item: data } : item
    );

    this.setState({
      allItemsWithKeys: newAllItemsWithKeys,
    });
  };

  render() {
    const {
      instructions,
      isDynamic,
      fields,
      editFields,
      headings,
      selectedAttribute,
      showSave = true,
      question,
    } = this.props;
    let { allItemsWithKeys } = this.state;

    const headingsToTh = () =>
      headings.map((heading, idx) => (
        <th scope="col" className="text-left" key={idx}>
          {heading}
        </th>
      ));

    // static render
    if (!isDynamic) {
      const { prompts } = this.props || [];
      allItemsWithKeys = this.uuid.addKeys(prompts); // get from props

      const selectedItemsWithKeys = this.filterSelected(allItemsWithKeys);

      if (selectedItemsWithKeys.length === 0) {
        return <p>Not started.</p>;
      }

      return (
        <table className="table" style={style.table}>
          <thead>
            <tr>{headingsToTh(headings)}</tr>
          </thead>
          <tbody>
            {selectedItemsWithKeys.map((item) => (
              <Top5
                key={item.key}
                id={item.key}
                data={item.item}
                fields={fields}
                isDynamic={isDynamic}
                updateCB={this.update}
              />
            ))}
          </tbody>
        </table>
      );
    }

    // dynamic render
    return (
      <>
        <p>{instructions}</p>
        <h4>{question.text}</h4>
        <Form>
          <table className="table" style={style.table}>
            <thead>
              <tr>
                <th scope="col" className="text-left"></th>
                {headingsToTh(headings)}
              </tr>
            </thead>
            <tbody>
              {allItemsWithKeys.map((item) => (
                <Top5
                  key={item.key}
                  id={item.key}
                  data={item.item}
                  fields={fields}
                  editFields={editFields}
                  selected={item.seleted}
                  selectedAttribute={selectedAttribute}
                  isDynamic={isDynamic}
                  updateCB={this.update}
                />
              ))}
            </tbody>
          </table>

          {showSave && (
            <Button type="button" onClick={this.onclickClose}>
              Save
            </Button>
          )}
        </Form>
      </>
    );
  }
}

const style = {
  table: { tableLayout: 'fixed', width: '100%' },
};

Top5List.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectedAttribute: PropTypes.string.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  editFields: PropTypes.array,
  prompts: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  headings: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onCloseModalCB: PropTypes.func,
  onSaveCB: PropTypes.func,
  onUpdate: PropTypes.func,
  showSave: PropTypes.bool,
};
