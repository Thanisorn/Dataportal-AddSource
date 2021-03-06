import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import DisplaySourceDetailContainer from './../../containers/DisplaySourceDetail'

describe('< DisplaySourceDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state to resource when call API properly', (done) => {
    const wrapper = shallow(<DisplaySourceDetailContainer id="0" />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [
          {
            name: 'Track Reseller',
            type: 'Superset Dashboard',
            url: 'https://www.prontotools.io/',
          },
        ],
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Track Reseller')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().type).toBe('Superset Dashboard')
        done()
      })
    })
  })
})
