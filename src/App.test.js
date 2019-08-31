import React from 'react';
import App from './App';
import {shallow} from "enzyme";
import toJson from 'enzyme-to-json';

describe('App presentation', () => {
    it('should render App component', () => {
        const result = shallow(<App />);
        expect(toJson(result)).toMatchSnapshot();
    });
});
