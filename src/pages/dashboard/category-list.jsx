import React from "react";
import { arrayOf, string } from "prop-types";
import styled from "styled-components";

import CategoryDialog from "../view-category/view-category-container";
import { PrimaryButton } from "../../components/buttons/buttons";

const ListContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Category = styled(PrimaryButton)`
  && {
    margin: 1rem;
    width: 8rem;
  }
`;

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleFetchJoke = this.handleFetchJoke.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSelectCategory(event) {
    const { handleLoadCategoryJokes } = this.props;
    handleLoadCategoryJokes(event);
    this.setState({ open: true });
  }

  handleFetchJoke(event) {
    const { fetchCategoryJoke } = this.props;
    console.log("event", event.currentTarget);
  }

  render() {
    const { categories, isLoading, hasError, hasLoaded } = this.props;
    return (
      <ListContainer>
        <CategoryDialog
          open={this.state.open}
          onClose={this.handleClose}
          isLoading={isLoading}
          hasError={hasError}
          hasLoaded={hasLoaded}
          fetchCategoryJoke={this.handleFetchJoke}
        />

        <CategoryContainer>
          {categories.map((category, key) => (
            <Category
              onClick={this.handleSelectCategory}
              key={key}
              value={category}
            >
              {category}
            </Category>
          ))}
        </CategoryContainer>
      </ListContainer>
    );
  }
}

CategoryList.propTypes = {
  categories: arrayOf(string).isRequired
};

export default CategoryList;