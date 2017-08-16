import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { Search, SearchUsers, SearchRepo, User } from '../client/components/';
import configureStore from '../redux/configureStore';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';


const testStore = configureStore();

const props = {
  children: <BrowserRouter><SearchRepo store={testStore} match={ { params : {login:'acdlite'} } } /></BrowserRouter>,
  store:testStore,
}

const context = {
  history: { push() { } },
  user: { login: 'acdlite' },
}


describe('Searching for repo', function () {

  it('should return repo',  (done) => {
    const wrapper = mount(<Search {...props} />, { context, childContextTypes: { history:PropTypes.any} });
    wrapper.find('input').first().simulate('change', {target: {value: 'recompose' } })
    wrapper.find('button').first().simulate('click')
      setTimeout(() => {
        let data = wrapper.instance().store.getState().repo.repo || {}
        if (data.full_name) expect(data.full_name).to.equal('acdlite/recompose');
        done()
      }, 1000)
  });

});
