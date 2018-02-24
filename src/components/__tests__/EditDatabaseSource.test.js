import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import EditDatabaseSource from './../EditDatabaseSource'

describe('<EditDatabaseSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    const id = 5
    const name = 'ProntoWorld Teams'
    const description = 'Description ProntoWorld Teams'
    const columns = ['TeamName, string, Description']
    const type = 'Database'
    const tags = ['team', 'database']
    const wrapper = mount(<EditDatabaseSource
      id={id}
      name={name}
      description={description}
      columns={columns}
      type={type}
      tags={tags}
    />)
    expect(wrapper.props().type).toBe('Database')
  })

  it('should initial state of Columntype', () => {
    const id = 5
    const name = 'ProntoWorld Teams'
    const description = 'Description ProntoWorld Teams'
    const columns = ['TeamName, string, Description']
    const type = 'Database'
    const tags = ['team', 'database']
    const wrapper = shallow(<EditDatabaseSource
      id={id}
      name={name}
      description={description}
      columns={columns}
      type={type}
      tags={tags}
    />)
    wrapper.setState({
      type: [
        'int',
        'double',
        'float',
        'bigint',
        'string',
        'boolean',
        'timestamp',
        'date',
      ],
    })
    expect(wrapper.state().type).toEqual([
      'int',
      'double',
      'float',
      'bigint',
      'string',
      'boolean',
      'timestamp',
      'date',
    ])
  })

  it('should render form', () => {
    const id = 5
    const name = 'ProntoWorld Teams'
    const description = 'Description ProntoWorld Teams'
    const columns = ['TeamName, string, Description']
    const type = 'Database'
    const tags = ['team', 'database']
    const wrapper = shallow(<EditDatabaseSource
      id={id}
      name={name}
      description={description}
      columns={columns}
      type={type}
      tags={tags}
    />)
    const form = wrapper.find('form')
    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('textarea[name="description"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
    expect(form.find('input[name="columnName"]').length).toBe(2)
    expect(form.find('Dropdown[name="columnType"]').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    const id = 5
    const name = 'ProntoWorld Teams'
    const description = 'Description ProntoWorld Teams'
    const columns = ['TeamName, string, Description']
    const type = 'Database'
    const tags = ['team', 'database']
    const wrapper = shallow(<EditDatabaseSource
      id={id}
      name={name}
      description={description}
      columns={columns}
      type={type}
      tags={tags}
    />)
    wrapper.setState({
      name: 'ProntoWorld Teams',
      description: 'Description ProntoWorld Teams',
      columns: ['TeamName, string, Description'],
      tags: 'prontoworld, servey',
      type: 'Database',
    })
    expect(wrapper.state().name).toBe('ProntoWorld Teams')
    expect(wrapper.state().description).toBe('Description ProntoWorld Teams')
    expect(wrapper.state().columns).toEqual(['TeamName, string, Description'])
    expect(wrapper.state().tags).toEqual('prontoworld, servey')
  })

  it('should simulates click submit form', (done) => {
    const id = 5
    const name = 'ProntoWorld Teams'
    const description = 'Description ProntoWorld Teams'
    const columns = ['TeamName, string, Description']
    const type = 'Database'
    const tags = ['team', 'database']
    const wrapper = shallow(<EditDatabaseSource
      id={id}
      name={name}
      description={description}
      columns={columns}
      type={type}
      tags={tags}
    />)
    const preventDefault = jest.fn()
    wrapper.find('form[name="table"]').simulate('submit', { preventDefault })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: 200,
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit)
        expect(request.url).toBe('http://localhost:5000/source/edit/')
        expect(request.config.method).toBe('post')
        done()
      })
    })
  })
})
