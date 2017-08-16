import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { Search, SearchRepo, Issues, User } from '../client/components/';
import configureStore from '../redux/configureStore';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';
import Utils from 'react-dom/test-utils';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Router from 'react-router-dom/Route';
import sinon from 'sinon';
const testStore = configureStore();
const route = {}
const props = {
  children: <BrowserRouter><Issues store={testStore} match={ { params : {login:'acdlite', repo: 'recompose'} } } /></BrowserRouter>,
  store:testStore,
}

const context = {
  history: { push() { } },
  user: { login: 'acdlite' },
}


describe('Searching for Repo', function () {

  it('should return 20 issues',  (done) => {
    sinon.spy(Issues.prototype, 'componentDidMount');
    const wrapper = mount(<Search {...props} />, { context, childContextTypes: { history:PropTypes.any, user:PropTypes.any} });
    expect(Issues.prototype.componentDidMount.calledOnce).to.equal(true);
    setTimeout(() => {
      if (wrapper.instance().store.getState().issues.issues)
      expect(wrapper.instance().store.getState().issues.issues.data.length).to.equal(20);
      done()
    }, 1000)
  });
  it('should return 100 issues', (done) => {
    const wrapper = mount(<Search {...props} />, { context, childContextTypes: { history:PropTypes.any, user:PropTypes.any} });
    setTimeout(() => {
      expect(wrapper.find('.views-main').first().find('span').last().find('span').last().simulate('click'));
    }, 500)
    setTimeout(() => {
      if (wrapper.instance().store.getState().issues.issues.data.length)
      expect(wrapper.instance().store.getState().issues.issues.data.length).to.equal(100);
      else expect(wrapper.instance().store.getState().issues.limit).to.equal(100);
      done();
    },500)
  })

});
