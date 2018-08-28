import React, { Component } from 'react';
import {
    Button,
    InputGroup,
    InputGroupAddon,
    NavItem,
    Form
} from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import GraphIcon from '../assets/graph.png';
import { connect } from 'react-redux';

const theme = {
    container: 'autosuggest',
    input: 'form-control',
    suggestionsContainer: 'dropdown open h-100',
    suggestionsList: 'custom-dropdown-menu bg-white',
    suggestion: 'dropdown-item',
    suggestionFocused: 'active',
    suggestionHighlighted: 'bg-light',
};

const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    name: state.account.firstName,
    symbol: state.stock.symbol,
    referenceDataSymbols: state.referenceData.dataSymbols
});

const getSuggestionValue = suggestion => suggestion.symbol;

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const suggestions = inputLength === 0 ? [] : this.props.autocompleteData.filter(autocompleteData => autocompleteData.symbol.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({
            suggestions: suggestions
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleSubmit(e) {
        // Handle submit in parent component
        e.preventDefault();
        this.props.handleSubmit(this.state.value)
    }

    render() {
        const { value, suggestions } = this.state;
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };
        return (
            <NavItem className="d-flex align-items-center">
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Autosuggest
                            theme={theme} // using custom theme
                            suggestions={suggestions.slice(0, 5)} // top 5 results
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} // queries value against symbol list
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                        <InputGroupAddon addonType="append">
                            <Button type="submit">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </NavItem>
        )
    }
}

const renderSuggestion = suggestion => (
    <div>
        <div className="d-flex align-items-center">
            <img className="mr-2" src={GraphIcon} width="16" height="16" alt="Graph" />
            {suggestion.symbol}
        </div>
        <small className="form-text text-muted">{suggestion.name}</small>
    </div>
);

export default connect(mapStateToProps)(Search);