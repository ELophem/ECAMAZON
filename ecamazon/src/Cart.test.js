import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { ShopProvider } from './shop-context'; // Assuming the ShopProvider wraps the Cart component

// Mocking the context value
jest.mock('./shop-context', () => ({
  useShopContext: () => ({
    cartItems: [
      { id: 1, name: 'Product 1', image_url: 'image1.jpg', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', image_url: 'image2.jpg', price: 20, quantity: 1 },
    ],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    getTotalCartAmount: jest.fn().mockReturnValue(50),
  }),
}));

describe('Cart Component', () => {
  it('renders cart items properly', () => {
    const { getByText, getAllByRole } = render(
      <ShopProvider>
        <Cart />
      </ShopProvider>
    );

    const cartItems = getAllByRole('listitem');
    expect(cartItems).toHaveLength(2); // Assuming two items are rendered
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    const { getByText } = render(
      <ShopProvider>
        <Cart />
      </ShopProvider>
    );

    const removeButton = getByText('Remove'); // Assuming the text is 'Remove' for remove button
    fireEvent.click(removeButton);
    expect(useShopContext().removeFromCart).toHaveBeenCalled();
  });

  it('calls addToCart when add button is clicked', () => {
    const { getByText } = render(
      <ShopProvider>
        <Cart />
      </ShopProvider>
    );

    const addButton = getByText('+'); // Assuming the text is '+' for add button
    fireEvent.click(addButton);
    expect(useShopContext().addToCart).toHaveBeenCalled();
  });

  it('calls removeFromCart when decrease button is clicked', () => {
    const { getByText } = render(
      <ShopProvider>
        <Cart />
      </ShopProvider>
    );

    const decreaseButton = getByText('-'); // Assuming the text is '-' for decrease button
    fireEvent.click(decreaseButton);
    expect(useShopContext().removeFromCart).toHaveBeenCalled();
  });

  it('displays total cart amount correctly', () => {
    const { getByText } = render(
      <ShopProvider>
        <Cart />
      </ShopProvider>
    );

    expect(getByText('Total: $50')).toBeInTheDocument();
  });
});
