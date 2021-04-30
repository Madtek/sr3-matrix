import React from 'react';
import { render } from '@testing-library/react';
import RootStore from "../../stores/RootStore";
import HostManager from "./HostManager";

test('renders learn react link', () => {
  render(<HostManager root={new RootStore()}/>);
});
