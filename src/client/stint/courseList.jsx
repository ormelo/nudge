import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

import { useHistory } from "react-router-dom";

class CourseList extends Component {

    constructor() {
        super();
        this.state = {

        };
    }
    componentDidMount() {}

    render() {
        return (<section className="py-8">
                          <div className="container px-4 mx-auto"><div>
                              <h1 className="mb-2 text-3xl font-bold font-heading">Explore Courses</h1><br/>
                              </div></div>
                        <div className="container px-4 mx-auto">
                          <div className="flex flex-wrap -m-4">
                            <Link className="w-full lg:w-1/3 p-4" to="/course/react-1234">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/3 p-4">
                              <div className="bg-white shadow rounded overflow-hidden">
                                <div className="pt-6 px-6 mb-10 flex justify-between items-center">
                                  <span className="inline-flex items-center justify-center w-9 h-10 bg-gray-50 rounded">
                                    <img className="h-6" src="artemis-assets/mini-logos/reactjs.svg" alt=""/>
                                  </span>
                                  <a className="py-1 px-2 bg-green-50 text-sm text-green-600 rounded-full" href="#">Live Mentoring</a>
                                </div>
                                <div className="px-6 mb-6">
                                  <h4 className="text-xl font-bold">React JS in 14 days</h4>
                                  <p className="text-xs text-gray-500">Learn React & Redux, build 1 live project</p>
                                </div>
                                <div className="p-6 bg-lightGray-50">
                                  <div className="flex -mx-2 mb-6">
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Final Date</p>
                                      <span className="inline-block py-1 px-2 bg-orange-50 rounded-full text-xs text-red-500">14 March 2021</span>
                                    </div>
                                    <div className="w-1/2 px-2">
                                      <p className="mb-2 text-xs font-medium">Price</p>
                                      <span className="inline-block py-1 px-2 bg-green-50 rounded-full text-xs text-green-500">₹3,900</span>
                                    </div>
                                  </div>
                                  <div className="flex mb-6">
                                    <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt=""/>
                                    <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1055&amp;q=80" alt=""/>
                                    <div className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                                  </div>
                                  <p className="mb-2 text-xs font-medium">Learning Speed (70% faster than any online course)</p>
                                  <div className="relative w-full h-1 mb-3 rounded-full bg-blue-100">
                                    <div className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between pt-6">
                            <div className="w-full lg:w-auto mb-4 lg:mb-0 flex items-center">
                              <p className="mr-3 text-xs text-gray-400">Show</p>
                              <div className="flex mr-3 py-2 pl-3 pr-2 bg-white border border-gray-100 rounded">
                                <select className="pr-2 text-xs text-gray-500" name="" id="">
                                  <option value="1">9</option>
                                  <option value="2">18</option>
                                  <option value="3">36</option>
                                </select>
                              </div>
                              <p className="text-xs text-gray-400">of 1200</p>
                            </div>
                            <div className="w-full lg:w-auto flex items-center justify-center">
                              <a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">
                                <svg width="6" height="8" viewbox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.53335 3.99999L4.86668 1.66666C5.13335 1.39999 5.13335 0.999992 4.86668 0.733325C4.60002 0.466659 4.20002 0.466659 3.93335 0.733325L1.13335 3.53333C0.866683 3.79999 0.866683 4.19999 1.13335 4.46666L3.93335 7.26666C4.06668 7.39999 4.20002 7.46666 4.40002 7.46666C4.60002 7.46666 4.73335 7.39999 4.86668 7.26666C5.13335 6.99999 5.13335 6.59999 4.86668 6.33333L2.53335 3.99999Z" fill="#A4AFBB"></path>
                                </svg>
                              </a>
                              <a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">1</a>
                              <span className="inline-block mr-3">
                                <svg className="h-3 w-3 text-gray-200" viewbox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0.666687C5.26667 0.666687 4.66667 1.26669 4.66667 2.00002C4.66667 2.73335 5.26667 3.33335 6 3.33335C6.73333 3.33335 7.33333 2.73335 7.33333 2.00002C7.33333 1.26669 6.73333 0.666687 6 0.666687ZM1.33333 0.666687C0.6 0.666687 0 1.26669 0 2.00002C0 2.73335 0.6 3.33335 1.33333 3.33335C2.06667 3.33335 2.66667 2.73335 2.66667 2.00002C2.66667 1.26669 2.06667 0.666687 1.33333 0.666687ZM10.6667 0.666687C9.93333 0.666687 9.33333 1.26669 9.33333 2.00002C9.33333 2.73335 9.93333 3.33335 10.6667 3.33335C11.4 3.33335 12 2.73335 12 2.00002C12 1.26669 11.4 0.666687 10.6667 0.666687Z" fill="currentColor"></path>
                                </svg>
                              </span>
                              <a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-white bg-green-500 rounded" href="#">12</a><a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">13</a><a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">14</a>
                              <span className="inline-block mr-3">
                                <svg className="h-3 w-3 text-gray-200" viewbox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0.666687C5.26667 0.666687 4.66667 1.26669 4.66667 2.00002C4.66667 2.73335 5.26667 3.33335 6 3.33335C6.73333 3.33335 7.33333 2.73335 7.33333 2.00002C7.33333 1.26669 6.73333 0.666687 6 0.666687ZM1.33333 0.666687C0.6 0.666687 0 1.26669 0 2.00002C0 2.73335 0.6 3.33335 1.33333 3.33335C2.06667 3.33335 2.66667 2.73335 2.66667 2.00002C2.66667 1.26669 2.06667 0.666687 1.33333 0.666687ZM10.6667 0.666687C9.93333 0.666687 9.33333 1.26669 9.33333 2.00002C9.33333 2.73335 9.93333 3.33335 10.6667 3.33335C11.4 3.33335 12 2.73335 12 2.00002C12 1.26669 11.4 0.666687 10.6667 0.666687Z" fill="currentColor"></path>
                                </svg>
                              </span>
                              <a className="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">62</a>
                              <a className="inline-flex items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded" href="#">
                                <svg width="6" height="8" viewbox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.88663 3.52667L2.05996 0.700006C1.99799 0.637521 1.92425 0.587925 1.84301 0.554079C1.76177 0.520233 1.67464 0.502808 1.58663 0.502808C1.49862 0.502808 1.41148 0.520233 1.33024 0.554079C1.249 0.587925 1.17527 0.637521 1.1133 0.700006C0.989128 0.824915 0.919434 0.993883 0.919434 1.17001C0.919434 1.34613 0.989128 1.5151 1.1133 1.64001L3.4733 4.00001L1.1133 6.36001C0.989128 6.48491 0.919434 6.65388 0.919434 6.83001C0.919434 7.00613 0.989128 7.1751 1.1133 7.30001C1.17559 7.36179 1.24947 7.41068 1.33069 7.44385C1.41192 7.47703 1.49889 7.49385 1.58663 7.49334C1.67437 7.49385 1.76134 7.47703 1.84257 7.44385C1.92379 7.41068 1.99767 7.36179 2.05996 7.30001L4.88663 4.47334C4.94911 4.41136 4.99871 4.33763 5.03256 4.25639C5.0664 4.17515 5.08383 4.08801 5.08383 4.00001C5.08383 3.912 5.0664 3.82486 5.03256 3.74362C4.99871 3.66238 4.94911 3.58865 4.88663 3.52667Z" fill="#A4AFBB"></path>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </section>)
    }
}

export default withRouter(CourseList);