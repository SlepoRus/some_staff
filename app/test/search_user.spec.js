import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { Search, SearchUsers, SearchRepo, User } from '../client/components/';
import configureStore from '../redux/configureStore';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';


const testStore = configureStore();

const props = {
  children: <SearchUsers store={testStore} />,
  store:testStore,
}

const context = {
  history: { push() { } },
}


describe('Searching for User', function () {

  it('should return user',  (done) => {
    const wrapper = mount(<Search {...props} />, { context, childContextTypes: { history:PropTypes.any} });
    wrapper.find('input').first().simulate('change', {target: {value: 'acdlite' } })
    wrapper.find('button').first().simulate('click')
      setTimeout(() => {
        let data = wrapper.instance().store.getState().user.user || {}
        if (data.login) expect(data.login).to.equal('acdlite');
        done();
      }, 1000)
  });

});
