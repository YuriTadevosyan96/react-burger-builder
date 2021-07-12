const mapStateToProps = (state) => ({
  ingredients: state.ingredients.ingredients,
  totalPrice: state.ingredients.totalPrice,
});

export default mapStateToProps;
