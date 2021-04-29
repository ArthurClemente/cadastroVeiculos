import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'car',
    title: 'Cadastro de veículos'
}

const baseUrl = 'http://localhost:3001/veiculos'

const initialState = {
    veiculo: { Modelo: '', Marca: '', Valor: '', Obsevações: '' },
    list: []
}

export default class VeiculoCrud extends Component {
    
    state = { ...initialState }
    
    clear() {
        this.setState({ veiculo: initialState.veiculo })
    }

    save() {
        const veiculo = this.state.veiculo
        const metodo = veiculo.id ? 'put' : 'post'
        const url = veiculo.id ? `${baseUrl}/${veiculo.id}` : baseUrl
        axios[metodo](url, veiculo)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ veiculo: initialState.veiculo, list })
            })
    }

    getUpdatedList(veiculo) {
        const list = this.state.list.filter(v => v.id !== veiculo.id)
        list.unshift(veiculo)
        return list
    }
    
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Veículos
            </Main>
        )
    }
}