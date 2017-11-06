import React, { Component } from 'react';
import { Container, Table, Form } from 'semantic-ui-react'

import { formatFood } from '../commons/helpers';
import foodGroups from './food-groups';

class FoodList extends Component {
    constructor() {
        super();

        this.state = {
            foods: [],
            foodGroups: [],
            foodGroup: undefined,
            multiplicador: 1.0
        };
    }

    componentDidMount() {
        this.setState({
            'foodGroups': foodGroups.map( foodGroup => ({
                value: foodGroup.uuid,
                text : foodGroup.description
            }))
        });

        fetch("https://intense-crag-69866.herokuapp.com/foods").then( (response) => {
            return response.json();
        }).then( (foods) => {
            this.setState({ foods });
        });
    }

    render() {
        return (
            <Container>
                <Form>

                    <Form.Input placeholder="Multiplicador" step="0.1" type="number" value={this.state.multiplicador}
                           onChange={(e, { value }) => this.setState({ multiplicador: e.target.value })} />

                    <Form.Dropdown placeholder="Grupo alimentar" search selection options={this.state.foodGroups}
                           value={this.state.foodGroup}
                           onChange={(e, { value }) => this.setState({ foodGroup: value })} />

                </Form>

                <Table basic>
                    <Table.Body>
                        { this.state.foods.filter( (food) => food.uuid_food_group === this.state.foodGroup )
                            .map( (food) => (
                            <Table.Row key={food.uuid}>
                                <Table.Cell>{ formatFood(food, this.state.multiplicador) }</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            </Container>
        );
    }
}

export default FoodList;
