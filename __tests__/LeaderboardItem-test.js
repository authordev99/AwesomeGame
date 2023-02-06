import React from 'react';
import renderer from 'react-test-renderer';
import CategoryItem from "../components/CategoryItem";
import LeaderboardItem from "../components/LeaderboardItem";

test('renders correctly', () => {
  const mockData = {"correct": 2, "data": {"category": "Cities", "id": 1, "image": 3, "isSelected": true, "questions": [[Object], [Object], [Object]]}, "finalScore": 250, "skip": 1, "totalQuestion": 3, "user": {"score": 250, "username": "Federico"}, "wrong": 0}
  const tree = renderer.create(<LeaderboardItem item={mockData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
