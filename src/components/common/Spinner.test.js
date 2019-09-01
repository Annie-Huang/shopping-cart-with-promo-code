import React from "react";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme/build";
import Spinner from "./Spinner";

describe('Spinner presentation', () => {
    it('should render Spinner component', () => {
        expect(toJson(shallow(<Spinner />))).toMatchSnapshot();
    });
});
