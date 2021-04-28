import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'car',
    title: 'Cadastro de veículos'
}

export default class veiculoCrud extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Veículos
            </Main>
        )
    }
}