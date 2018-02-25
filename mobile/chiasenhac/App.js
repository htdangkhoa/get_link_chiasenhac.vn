import React, { Component } from 'react'
import {
    View
} from 'react-native'

import Store from './src/redux/Store'
import { Provider } from 'react-redux'

import registerApp from './src'
registerApp(Store, Provider)