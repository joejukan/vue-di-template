<template>
    <div>
        <h1>{{title}}</h1>
        <router-link to="/form">Go to Form</router-link>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, p, routes, VueClass} from "vue-di-kit";
@Component()
export default class AppComponent extends Vue {
    public title: string = "My App";
}
</script>