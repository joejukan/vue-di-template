<template>
    <form>
        <label>First Name</label>
        <input type="text" v-model="firstName">
        <br/>
        <label>Last Name</label>
        <input type="text" v-model="lastName">
        <br/>
        <label>Email Address</label>
        <label>{{email}}</label>
    </form>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, p, Compute, Routing, routes} from "vue-di-kit";

@Routing('/form')
@Component({name: 'f-component'})
export default class FormComponent extends Vue {
    @Prop({required: true})
    private lastName: string = 'Last';
    @Prop({required: true})
    public firstName: string = 'First';

    @Compute()
    public get email(): string {
        return this.toLowerCase(`${this.firstName}.${this.lastName}@email.com`);
    }

    public toLowerCase(value: string): string{
        return value.toLowerCase();
    }

    public created () {
        console.log(routes);
    }
}
</script>