import React from 'react';
import renderer from 'react-test-renderer';
import CategoryItem from "../components/CategoryItem";

test('renders correctly', () => {
  const mockData = {"category": "Food", "id": 3, "image": 5, "isSelected": false, "questions": [{"answer": "Laksa", "point": 50, "question": "Best Singapore food?"}, {"answer": "Durian", "point": 50, "question": "Which fruit is banned across all types of public transport in Singapore because of its unpleasant odor?"}, {"answer": "Italy", "point": 100, "question": "Pizza and pasta originated from which country?"}, {"answer": "Sugar", "point": 100, "question": "What is the main ingredient in cotton candy?"}, {"answer": "Spinach", "point": 100, "question": "Which food item does Popeye consume to gain strength?"}]}
  const tree = renderer.create(<CategoryItem data={mockData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
