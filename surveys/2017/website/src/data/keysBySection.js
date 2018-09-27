import backend from './backend.json'
import build from './build.json'
import style from './style.json'
import flavors from './flavor.json'
import frontend from './frontend.json'
import mobile from './mobile.json'
import state from './state.json'
import testing from './testing.json'

const keysBySection = {
    backend: backend.keys,
    build: build.keys,
    style: style.keys,
    flavors: flavors.keys,
    frontend: frontend.keys,
    mobile: mobile.keys,
    state: state.keys,
    testing: testing.keys
}

export default keysBySection
