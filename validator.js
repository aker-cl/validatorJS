import messages from './lang/en.js'
import messages_es from './lang/es.js'

export default class Validator {
    constructor(lang = 'en') {
        /** @type {string} */
        this.lang = lang
        /** @type {string} */
        this.lang = lang
        /** @type {Object} */
        this.value
        /** @type {string} */
        this.field_name
        /** @type {any} */
        this.element_id
        /** @type {Array} */
        this.errors = []
        /** @type {Array} */
        this.inputs = []
        /** @type {Object} */
        this.validations = {}
        /** @type {Object} */
        this.dataMessages = {}

        if(lang == 'en'){
            this.getMessage = messages
        }else{
            this.getMessage = messages_es
        }

        if (!document.querySelector('#validator-styles')) {
            const style = document.createElement('style')
            style.id = 'validator-styles'
            style.innerHTML = /* css*/ `
            .validator-error {
                margin-top: 3px;
                margin-left: 5px;
                color: salmon;
                position: relative;
            }
            
            .validator-invalid {
                border-bottom: solid 2px #ff4141;
                box-shadow: 0 1px 2px -0.7px #ff4141;
                padding-right: calc(1.5em + 0.75rem);
                background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTIyLjg4cHgiIGhlaWdodD0iMTIyLjg3OXB4IiB2aWV3Qm94PSIwIDAgMTIyLjg4IDEyMi44NzkiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyMi44OCAxMjIuODc5IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsPSIjRkY0MTQxIiBkPSJNNjEuNDQsMGMxNi45NiwwLDMyLjMyOCw2Ljg4Miw0My40NTMsMTcuOTg2YzExLjEwNCwxMS4xMjUsMTcuOTg2LDI2LjQ5NCwxNy45ODYsNDMuNDUzIGMwLDE2Ljk2MS02Ljg4MywzMi4zMjgtMTcuOTg2LDQzLjQ1M0M5My43NjksMTE1Ljk5OCw3OC40LDEyMi44NzksNjEuNDQsMTIyLjg3OWMtMTYuOTYsMC0zMi4zMjktNi44ODEtNDMuNDU0LTE3Ljk4NiBDNi44ODIsOTMuNzY4LDAsNzguNCwwLDYxLjQzOUMwLDQ0LjQ4LDYuODgyLDI5LjExMSwxNy45ODYsMTcuOTg2QzI5LjExMiw2Ljg4Miw0NC40OCwwLDYxLjQ0LDBMNjEuNDQsMHogTTczLjQ1MiwzOS4xNTIgYzIuNzUtMi43OTIsNy4yMjEtMi44MDUsOS45ODYtMC4wMjZjMi43NjQsMi43NzYsMi43NzUsNy4yOTIsMC4wMjcsMTAuMDgzTDcxLjQsNjEuNDQ1bDEyLjA3NywxMi4yNSBjMi43MjgsMi43NywyLjY4OSw3LjI1Ni0wLjA4MSwxMC4wMjFjLTIuNzcyLDIuNzY2LTcuMjI5LDIuNzU4LTkuOTU0LTAuMDEyTDYxLjQ0NSw3MS41NDFMNDkuNDI4LDgzLjcyOSBjLTIuNzUsMi43OTMtNy4yMiwyLjgwNS05Ljk4NSwwLjAyNWMtMi43NjMtMi43NzUtMi43NzYtNy4yOTEtMC4wMjYtMTAuMDgyTDUxLjQ4LDYxLjQzNWwtMTIuMDc4LTEyLjI1IGMtMi43MjYtMi43NjktMi42ODktNy4yNTYsMC4wODItMTAuMDIyYzIuNzcyLTIuNzY1LDcuMjI5LTIuNzU4LDkuOTU0LDAuMDEzTDYxLjQzNSw1MS4zNEw3My40NTIsMzkuMTUyTDczLjQ1MiwzOS4xNTJ6IE05Ni44OTksMjUuOThDODcuODI2LDE2LjkwNyw3NS4yOSwxMS4yOTYsNjEuNDQsMTEuMjk2Yy0xMy44NTEsMC0yNi4zODcsNS42MTEtMzUuNDYsMTQuNjg1IGMtOS4wNzMsOS4wNzMtMTQuNjg0LDIxLjYwOS0xNC42ODQsMzUuNDU5czUuNjExLDI2LjM4NywxNC42ODQsMzUuNDU5YzkuMDczLDkuMDc0LDIxLjYwOSwxNC42ODYsMzUuNDYsMTQuNjg2IGMxMy44NSwwLDI2LjM4Ni01LjYxMSwzNS40NTktMTQuNjg2YzkuMDczLTkuMDcyLDE0LjY4NC0yMS42MDksMTQuNjg0LTM1LjQ1OVMxMDUuOTczLDM1LjA1NCw5Ni44OTksMjUuOThMOTYuODk5LDI1Ljk4eiIvPjwvZz48L3N2Zz4=');
                background-repeat: no-repeat;
                background-position: right calc(0.375rem + 0.1875rem) center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            
            .validator-invalid:focus {
                border-color: #ff4141!important;
                box-shadow: 0 0 0 0.05rem #ff4141!important
            }
            
            .validator-invalid[type="date"],
            .validator-invalid[type="time"],
            .validator-invalid[type="dateTime-local"]
            {
                padding-right: calc(0.75rem);
                background-position: right 2.2rem center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            
            .validator-invalid[type="checkbox"]{
                border: solid 2px #ff4141!important;
                background-image: none;
                padding-right: inherit;
            }
            
            .validator-invalid[type="radio"]{
                border: solid 2px #ff4141!important;
                background-image: none;
                padding-right: inherit;
            }
            
            select.validator-invalid {
                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNic+PHBhdGggZmlsbD0nbm9uZScgc3Ryb2tlPScjMzQzYTQwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicgZD0nTTIgNWw2IDYgNi02Jy8+PC9zdmc+') ,url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTIyLjg4cHgiIGhlaWdodD0iMTIyLjg3OXB4IiB2aWV3Qm94PSIwIDAgMTIyLjg4IDEyMi44NzkiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyMi44OCAxMjIuODc5IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsPSIjRkY0MTQxIiBkPSJNNjEuNDQsMGMxNi45NiwwLDMyLjMyOCw2Ljg4Miw0My40NTMsMTcuOTg2YzExLjEwNCwxMS4xMjUsMTcuOTg2LDI2LjQ5NCwxNy45ODYsNDMuNDUzIGMwLDE2Ljk2MS02Ljg4MywzMi4zMjgtMTcuOTg2LDQzLjQ1M0M5My43NjksMTE1Ljk5OCw3OC40LDEyMi44NzksNjEuNDQsMTIyLjg3OWMtMTYuOTYsMC0zMi4zMjktNi44ODEtNDMuNDU0LTE3Ljk4NiBDNi44ODIsOTMuNzY4LDAsNzguNCwwLDYxLjQzOUMwLDQ0LjQ4LDYuODgyLDI5LjExMSwxNy45ODYsMTcuOTg2QzI5LjExMiw2Ljg4Miw0NC40OCwwLDYxLjQ0LDBMNjEuNDQsMHogTTczLjQ1MiwzOS4xNTIgYzIuNzUtMi43OTIsNy4yMjEtMi44MDUsOS45ODYtMC4wMjZjMi43NjQsMi43NzYsMi43NzUsNy4yOTIsMC4wMjcsMTAuMDgzTDcxLjQsNjEuNDQ1bDEyLjA3NywxMi4yNSBjMi43MjgsMi43NywyLjY4OSw3LjI1Ni0wLjA4MSwxMC4wMjFjLTIuNzcyLDIuNzY2LTcuMjI5LDIuNzU4LTkuOTU0LTAuMDEyTDYxLjQ0NSw3MS41NDFMNDkuNDI4LDgzLjcyOSBjLTIuNzUsMi43OTMtNy4yMiwyLjgwNS05Ljk4NSwwLjAyNWMtMi43NjMtMi43NzUtMi43NzYtNy4yOTEtMC4wMjYtMTAuMDgyTDUxLjQ4LDYxLjQzNWwtMTIuMDc4LTEyLjI1IGMtMi43MjYtMi43NjktMi42ODktNy4yNTYsMC4wODItMTAuMDIyYzIuNzcyLTIuNzY1LDcuMjI5LTIuNzU4LDkuOTU0LDAuMDEzTDYxLjQzNSw1MS4zNEw3My40NTIsMzkuMTUyTDczLjQ1MiwzOS4xNTJ6IE05Ni44OTksMjUuOThDODcuODI2LDE2LjkwNyw3NS4yOSwxMS4yOTYsNjEuNDQsMTEuMjk2Yy0xMy44NTEsMC0yNi4zODcsNS42MTEtMzUuNDYsMTQuNjg1IGMtOS4wNzMsOS4wNzMtMTQuNjg0LDIxLjYwOS0xNC42ODQsMzUuNDU5czUuNjExLDI2LjM4NywxNC42ODQsMzUuNDU5YzkuMDczLDkuMDc0LDIxLjYwOSwxNC42ODYsMzUuNDYsMTQuNjg2IGMxMy44NSwwLDI2LjM4Ni01LjYxMSwzNS40NTktMTQuNjg2YzkuMDczLTkuMDcyLDE0LjY4NC0yMS42MDksMTQuNjg0LTM1LjQ1OVMxMDUuOTczLDM1LjA1NCw5Ni44OTksMjUuOThMOTYuODk5LDI1Ljk4eiIvPjwvZz48L3N2Zz4=');
                background-position: right 0.75rem center, center right 2rem;
                background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            
            .validator-valid {
                border-bottom: solid 2px #7ec679;
                box-shadow: 0 1px 2px -0.7px #7ec679;
                padding-right: calc(1.5em + 0.75rem);
                background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTIyLjg4cHgiIGhlaWdodD0iMTIyLjg4cHgiIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjIuODggMTIyLjg4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsPSIjNkJCRTY2IiBkPSJNMzQuMzg4LDY3Ljk4NGMtMC4yODYtMC4zMDgtMC41NDItMC42MzgtMC43NjItMC45ODFjLTAuMjIxLTAuMzQ1LTAuNDE0LTAuNzE0LTAuNTczLTEuMDk3IGMtMC41MzEtMS4yNjUtMC42NzUtMi42MzEtMC40NTEtMy45MzRjMC4yMjQtMS4yOTQsMC44MTItMi41MzEsMS43NDQtMy41NDhsMC4zNC0wLjM1YzIuMjkzLTIuMTg1LDUuNzcxLTIuNTkyLDguNDk5LTAuOTUxIGMwLjM5LDAuMjMzLDAuNzYyLDAuNTEsMS4xMDksMC44MjdsMC4wMzQsMC4wMzFjMS45MzEsMS44NTIsNS4xOTgsNC44ODEsNy4zNDMsNi43OWwxLjg0MSwxLjY1MWwyMi41MzItMjMuNjM1IGMwLjMxNy0wLjMyNywwLjY2Ni0wLjYyLDEuMDM1LTAuODc2YzAuMzc4LTAuMjYxLDAuNzc1LTAuNDgyLDEuMTg1LTAuNjYxYzAuNDE0LTAuMTgxLDAuODUyLTAuMzIzLDEuMy0wLjQyMSBjMC40NDctMC4wOTksMC45MDMtMC4xNTUsMS4zNTYtMC4xNjVoMC4wMjZjMC40NTEtMC4wMDUsMC44OTMsMC4wMjcsMS4zNDEsMC4xMDNjMC40MzcsMC4wNzQsMC44NzYsMC4xOTMsMS4zMzMsMC4zNjkgYzAuNDIxLDAuMTYxLDAuODI1LDAuMzYzLDEuMjA3LDAuNjA0YzAuMzY1LDAuMjMxLDAuNzIxLDAuNTA2LDEuMDU2LDAuODIybDAuMTYyLDAuMTQ3YzAuMzE2LDAuMzEzLDAuNjAxLDAuNjUzLDAuODUsMS4wMTQgYzAuMjU2LDAuMzY5LDAuNDc1LDAuNzY2LDAuNjUyLDEuMTc4YzAuMTgzLDAuNDE0LDAuMzI1LDAuODUyLDAuNDI0LDEuMjk5YzAuMSwwLjQzOSwwLjE1NCwwLjg5NSwwLjE2NSwxLjM2djAuMjMgYy0wLjAwNCwwLjM5OS0wLjA0MiwwLjgwNC0wLjExNCwxLjIwNGMtMC4wNzksMC40MzUtMC4xOTgsMC44NjMtMC4zNTYsMS4yNzFjLTAuMTYsMC40MTgtMC4zNjUsMC44MjUtMC42MDcsMS4yMSBjLTAuMjM4LDAuMzc3LTAuNTE4LDAuNzM5LTAuODMyLDEuMDdsLTI3LjIxOSwyOC41NmMtMC4zMiwwLjM0Mi0wLjY2MywwLjY0Mi0xLjAyMiwwLjg5OGMtMC4zNjksMC4yNjQtMC43NjcsMC40OTEtMS4xODMsMC42ODEgYy0wLjQxNywwLjE4OC0wLjg1MSwwLjMzNy0xLjI4OCwwLjQ0Yy0wLjQzNSwwLjEwNC0wLjg4OSwwLjE2Ni0xLjM1LDAuMTg3bC0wLjEyNSwwLjAwM2MtMC40MjMsMC4wMDktMC44NC0wLjAxNi0xLjI0MS0wLjA3OCBsLTAuMTAyLTAuMDJjLTAuNDE1LTAuMDctMC44MTktMC4xNzQtMS4yMDUtMC4zMWMtMC40MjEtMC4xNS0wLjgzMy0wLjM0My0xLjIyNi0wLjU3NWwtMC4wNjMtMC4wNCBjLTAuMzcxLTAuMjI0LTAuNzE3LTAuNDc3LTEuMDMyLTAuNzU0bC0wLjA2My0wLjA2Yy0xLjU4LTEuNDY2LTMuMjk3LTIuOTU4LTUuMDMzLTQuNDY2Yy0zLjAwNy0yLjYxMy03LjE3OC02LjM4Mi05LjY3OC05LjAyIEwzNC4zODgsNjcuOTg0TDM0LjM4OCw2Ny45ODR6IE02MS40NCwwYzE2Ljk2LDAsMzIuMzI4LDYuODgzLDQzLjQ1MywxNy45ODdjMTEuMTA0LDExLjEyNSwxNy45ODYsMjYuNDkzLDE3Ljk4Niw0My40NTMgYzAsMTYuOTYxLTYuODgzLDMyLjMyOS0xNy45ODYsNDMuNDU0QzkzLjc2OSwxMTUuOTk4LDc4LjQsMTIyLjg4LDYxLjQ0LDEyMi44OGMtMTYuOTYxLDAtMzIuMzI5LTYuODgyLTQzLjQ1NC0xNy45ODYgQzYuODgyLDkzLjc2OSwwLDc4LjQsMCw2MS40MzlDMCw0NC40OCw2Ljg4MiwyOS4xMTIsMTcuOTg2LDE3Ljk4N0MyOS4xMTIsNi44ODMsNDQuNDc5LDAsNjEuNDQsMEw2MS40NCwweiBNOTYuODk5LDI1Ljk4MSBDODcuODI2LDE2LjkwNyw3NS4yOSwxMS4yOTYsNjEuNDQsMTEuMjk2Yy0xMy44NTEsMC0yNi4zODcsNS42MTEtMzUuNDYsMTQuNjg1Yy05LjA3Myw5LjA3My0xNC42ODQsMjEuNjA5LTE0LjY4NCwzNS40NTggYzAsMTMuODUxLDUuNjExLDI2LjM4NywxNC42ODQsMzUuNDZzMjEuNjA5LDE0LjY4NSwzNS40NiwxNC42ODVjMTMuODUsMCwyNi4zODYtNS42MTEsMzUuNDU5LTE0LjY4NXMxNC42ODQtMjEuNjA5LDE0LjY4NC0zNS40NiBDMTExLjU4Myw0Ny41OSwxMDUuOTczLDM1LjA1NCw5Ni44OTksMjUuOTgxTDk2Ljg5OSwyNS45ODF6Ii8+PC9nPjwvc3ZnPg==');
                background-repeat: no-repeat;
                background-position: right calc(0.375rem + 0.1875rem) center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            
            .validator-valid:focus {
                border-color: #7ec679!important;
                box-shadow: 0 0 0 0.05rem #7ec679!important
            }
            
            .validator-valid[type="date"],
            .validator-valid[type="time"],
            .validator-valid[type="dateTime-local"]
            {
                padding-right: calc(0.75rem);
                background-position: right 2.2rem center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            
            .validator-valid[type="checkbox"]{
                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyMCAyMCc+PHBhdGggZmlsbD0nbm9uZScgc3Ryb2tlPScjZmZmJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMycgZD0nTTYgMTBsMyAzbDYtNicvPjwvc3ZnPg==');
                background-color: #7ec679!important;
                background-repeat: no-repeat;
                background-position: center;
                border-color: #7ec679!important;
                padding-right: inherit;
            }
            
            .validator-valid[type="radio"]{
                background-image: none;
                border-color: #7ec679!important;
                padding-right: inherit;
            }
            
            select.validator-valid {
                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNic+PHBhdGggZmlsbD0nbm9uZScgc3Ryb2tlPScjMzQzYTQwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicgZD0nTTIgNWw2IDYgNi02Jy8+PC9zdmc+') ,url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTIyLjg4cHgiIGhlaWdodD0iMTIyLjg4cHgiIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjIuODggMTIyLjg4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsPSIjNkJCRTY2IiBkPSJNMzQuMzg4LDY3Ljk4NGMtMC4yODYtMC4zMDgtMC41NDItMC42MzgtMC43NjItMC45ODFjLTAuMjIxLTAuMzQ1LTAuNDE0LTAuNzE0LTAuNTczLTEuMDk3IGMtMC41MzEtMS4yNjUtMC42NzUtMi42MzEtMC40NTEtMy45MzRjMC4yMjQtMS4yOTQsMC44MTItMi41MzEsMS43NDQtMy41NDhsMC4zNC0wLjM1YzIuMjkzLTIuMTg1LDUuNzcxLTIuNTkyLDguNDk5LTAuOTUxIGMwLjM5LDAuMjMzLDAuNzYyLDAuNTEsMS4xMDksMC44MjdsMC4wMzQsMC4wMzFjMS45MzEsMS44NTIsNS4xOTgsNC44ODEsNy4zNDMsNi43OWwxLjg0MSwxLjY1MWwyMi41MzItMjMuNjM1IGMwLjMxNy0wLjMyNywwLjY2Ni0wLjYyLDEuMDM1LTAuODc2YzAuMzc4LTAuMjYxLDAuNzc1LTAuNDgyLDEuMTg1LTAuNjYxYzAuNDE0LTAuMTgxLDAuODUyLTAuMzIzLDEuMy0wLjQyMSBjMC40NDctMC4wOTksMC45MDMtMC4xNTUsMS4zNTYtMC4xNjVoMC4wMjZjMC40NTEtMC4wMDUsMC44OTMsMC4wMjcsMS4zNDEsMC4xMDNjMC40MzcsMC4wNzQsMC44NzYsMC4xOTMsMS4zMzMsMC4zNjkgYzAuNDIxLDAuMTYxLDAuODI1LDAuMzYzLDEuMjA3LDAuNjA0YzAuMzY1LDAuMjMxLDAuNzIxLDAuNTA2LDEuMDU2LDAuODIybDAuMTYyLDAuMTQ3YzAuMzE2LDAuMzEzLDAuNjAxLDAuNjUzLDAuODUsMS4wMTQgYzAuMjU2LDAuMzY5LDAuNDc1LDAuNzY2LDAuNjUyLDEuMTc4YzAuMTgzLDAuNDE0LDAuMzI1LDAuODUyLDAuNDI0LDEuMjk5YzAuMSwwLjQzOSwwLjE1NCwwLjg5NSwwLjE2NSwxLjM2djAuMjMgYy0wLjAwNCwwLjM5OS0wLjA0MiwwLjgwNC0wLjExNCwxLjIwNGMtMC4wNzksMC40MzUtMC4xOTgsMC44NjMtMC4zNTYsMS4yNzFjLTAuMTYsMC40MTgtMC4zNjUsMC44MjUtMC42MDcsMS4yMSBjLTAuMjM4LDAuMzc3LTAuNTE4LDAuNzM5LTAuODMyLDEuMDdsLTI3LjIxOSwyOC41NmMtMC4zMiwwLjM0Mi0wLjY2MywwLjY0Mi0xLjAyMiwwLjg5OGMtMC4zNjksMC4yNjQtMC43NjcsMC40OTEtMS4xODMsMC42ODEgYy0wLjQxNywwLjE4OC0wLjg1MSwwLjMzNy0xLjI4OCwwLjQ0Yy0wLjQzNSwwLjEwNC0wLjg4OSwwLjE2Ni0xLjM1LDAuMTg3bC0wLjEyNSwwLjAwM2MtMC40MjMsMC4wMDktMC44NC0wLjAxNi0xLjI0MS0wLjA3OCBsLTAuMTAyLTAuMDJjLTAuNDE1LTAuMDctMC44MTktMC4xNzQtMS4yMDUtMC4zMWMtMC40MjEtMC4xNS0wLjgzMy0wLjM0My0xLjIyNi0wLjU3NWwtMC4wNjMtMC4wNCBjLTAuMzcxLTAuMjI0LTAuNzE3LTAuNDc3LTEuMDMyLTAuNzU0bC0wLjA2My0wLjA2Yy0xLjU4LTEuNDY2LTMuMjk3LTIuOTU4LTUuMDMzLTQuNDY2Yy0zLjAwNy0yLjYxMy03LjE3OC02LjM4Mi05LjY3OC05LjAyIEwzNC4zODgsNjcuOTg0TDM0LjM4OCw2Ny45ODR6IE02MS40NCwwYzE2Ljk2LDAsMzIuMzI4LDYuODgzLDQzLjQ1MywxNy45ODdjMTEuMTA0LDExLjEyNSwxNy45ODYsMjYuNDkzLDE3Ljk4Niw0My40NTMgYzAsMTYuOTYxLTYuODgzLDMyLjMyOS0xNy45ODYsNDMuNDU0QzkzLjc2OSwxMTUuOTk4LDc4LjQsMTIyLjg4LDYxLjQ0LDEyMi44OGMtMTYuOTYxLDAtMzIuMzI5LTYuODgyLTQzLjQ1NC0xNy45ODYgQzYuODgyLDkzLjc2OSwwLDc4LjQsMCw2MS40MzlDMCw0NC40OCw2Ljg4MiwyOS4xMTIsMTcuOTg2LDE3Ljk4N0MyOS4xMTIsNi44ODMsNDQuNDc5LDAsNjEuNDQsMEw2MS40NCwweiBNOTYuODk5LDI1Ljk4MSBDODcuODI2LDE2LjkwNyw3NS4yOSwxMS4yOTYsNjEuNDQsMTEuMjk2Yy0xMy44NTEsMC0yNi4zODcsNS42MTEtMzUuNDYsMTQuNjg1Yy05LjA3Myw5LjA3My0xNC42ODQsMjEuNjA5LTE0LjY4NCwzNS40NTggYzAsMTMuODUxLDUuNjExLDI2LjM4NywxNC42ODQsMzUuNDZzMjEuNjA5LDE0LjY4NSwzNS40NiwxNC42ODVjMTMuODUsMCwyNi4zODYtNS42MTEsMzUuNDU5LTE0LjY4NXMxNC42ODQtMjEuNjA5LDE0LjY4NC0zNS40NiBDMTExLjU4Myw0Ny41OSwxMDUuOTczLDM1LjA1NCw5Ni44OTksMjUuOTgxTDk2Ljg5OSwyNS45ODF6Ii8+PC9nPjwvc3ZnPg==');
                background-position: right 0.75rem center, center right 2rem;
                background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            `
            document.head.appendChild(style)
        }        
    }
    /**
     * @param {string|number|boolean|null} value null in case of radio inputs
     * @param {string} field_name 
     * @param {string|number|Array.<string>|null} element_id name in case of radio inputs
     * @param {true|null} listener
     */
    add(value, field_name, element_id = null, listener = null) {
        this.value = value
        this.field_name = field_name
        this.element_id = element_id
        this.dataMessages[element_id] = field_name
        this.inputs.push(element_id)

        if (element_id) {
            this.#setErrorMessage(element_id)
        }

        return this
    }
    /** @param {string|null} personalized_message */
    required(personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].required = [personalized_message]
        if(['', null].includes(this.value))
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'required', message: personalized_message ?? this.getMessage(this.field_name).required()})
        return this
    }
    /** @param {string|null} personalized_message */
    isNumber(personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isNumber = [personalized_message]
        if(!['', null].includes(this.value))
            if (typeof this.value !== "number")
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isNumber', message: personalized_message ?? this.getMessage(this.field_name).isNumber()})
        return this
    }
    /** @param {string|null} personalized_message */
    isString(personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isString = [personalized_message]
        if(!['', null].includes(this.value))
            if (typeof this.value !== "string" || /\S/.test(this.value) == false) 
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isString', message: personalized_message ?? this.getMessage(this.field_name).isString()})
        return this
    }
    /** @param {string|null} personalized_message */
    isEmail(personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isEmail = [personalized_message]
        if(!['', null].includes(this.value)){
            const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!validRegex.test(this.value))
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isEmail', message: personalized_message ?? this.getMessage(this.field_name).isEmail()})
        }
        return this
    }
    /** @param {string|null} personalized_message */
    isTrue(personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isTrue = [personalized_message]
        if(!['', null].includes(this.value))
            if(this.value != true)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isTrue', message: personalized_message ?? ''})
        return this
    }
    /** @param {string|null} personalized_message */
    isFalse(personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isFalse = [personalized_message]
        if(!['', null].includes(this.value))
            if(this.value != false)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isTrue', message: personalized_message ?? ''})
        return this
    }
    /** @param {string} personalized_message */
    isNull(personalized_message){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isNull = [personalized_message]
        if(this.value != null)
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isFalse', message: personalized_message})
        return this
    }
    /** @param {string} personalized_message */
    isEmpty(personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].isEmpty = [personalized_message]
        if(this.value != '')
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isEmpty', message: personalized_message ?? this.getMessage(this.field_name).isEmpty()})
    }
    /** @param {number|string} max @param {string|null} personalized_message */
    max(max, personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].max = [max, personalized_message]
        if(!['', null].includes(this.value) && !['', null].includes(max.toString()))
            if(this.value > max)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'max', message: personalized_message ?? this.getMessage(this.field_name).max(max)})
        return this
    }
    /** @param {number|string} min @param {string|null} personalized_message */
    min(min, personalized_message = null) {  
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].min = [min, personalized_message]     
        if(!['', null].includes(this.value) && !['', null].includes(min.toString()))
            if(this.value < min)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'min', message: personalized_message ?? this.getMessage(this.field_name).min(min)})
        return this
    }
    /** @param {number} max @param {string|null} personalized_message */
    maxLength(max, personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].maxLength = [max, personalized_message]
        if(!['', null].includes(this.value))
            if(this.value.toString().length > max)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'maxLength', message: personalized_message ?? this.getMessage(this.field_name).maxLength(max)})
        return this
    }
    /** @param {number} min @param {string|null} personalized_message */
    minLength(min, personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].minLength = [min, personalized_message]
        if(!['', null].includes(this.value))
            if(this.value.toString().length < min)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'minLength', message: personalized_message ?? this.getMessage(this.field_name).minLength(min)})
        return this
    }
    /** @param {number} max @param {string|null} personalized_message */
    maxYear(max, personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].maxYear = [max, personalized_message]
        if(!['', null].includes(this.value)){
            const date = new Date(this.value)

            if (date.getFullYear() > max)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'maxYear', message: personalized_message ?? this.getMessage(this.field_name).maxYear(max)})
        }
        return this
    }
    /** @param {number} min @param {string|null} personalized_message */
    minYear(min, personalized_message = null) {
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].minYear = [min, personalized_message]
        if(!['', null].includes(this.value)){
            const date = new Date(this.value)

            if (date.getFullYear() < min)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'minYear', message: personalized_message ?? this.getMessage(this.field_name).minYear(min)})
        }
        return this
    }
    /**
     * @param {string|number|null} value 
     * @param {string} second_field_name 
     * @param {string|null} personalized_message 
     */
    notEqual(value, second_field_name, personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].notEqual = [value, second_field_name, personalized_message]
        if(!['', null].includes(this.value))
            if(this.value == value)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'notEqual', message: personalized_message ?? this.getMessage(this.field_name).notEqual(second_field_name)})
        return this
    }
    /**
     * @param {string|number|null} value 
     * @param {string} second_field_name 
     * @param {string|null} personalized_message 
     */
    equal(value, second_field_name, personalized_message = null){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].equal = [value, second_field_name, personalized_message]
        if(!['', null].includes(this.value))
            if(this.value != value)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'equal', message: personalized_message ?? this.getMessage(this.field_name).equal(second_field_name)})
        return this
    }

    radioValues(personalized_message){
        if (!this.validations.hasOwnProperty(this.element_id))
            this.validations[this.element_id] = {}
        this.validations[this.element_id].radioValues = [personalized_message]

        const radios = document.querySelectorAll(`input[name="${this.element_id}"]`)
        let checked = false

        radios.forEach(radio => {
            //@ts-ignore
            if(radio.checked)
                checked = true
        })

        if(!checked)
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'radioValues', message: personalized_message})

        return this 
    }
    /**
     * Function to add custom error to validator
     * 
     * @param {String} errorName 
     * @param {RegExp} regex 
     * @param {String} errorMessage 
     */
    customErrorRegex(errorName, regex, errorMessage){
        if (!this.validations.hasOwnProperty(this.element_id)){
            this.validations[this.element_id] = {}   
        }

        if (!this.validations[this.element_id].customErrorRegex) {
            this.validations[this.element_id].customErrorRegex = []
        }
        
        if(!this.validations[this.element_id].customErrorRegex.some(err => err.includes(errorName))){
            this.validations[this.element_id].customErrorRegex.push([errorName, regex, errorMessage])
        }
        
        if(!['', null].includes(this.value))
            if(!regex.test(this.value))
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: errorName, message: errorMessage})
        return this
    }
    /**
     * @param {Function} formatValue function to change the format of input value
     * 
     * @returns {false}
     */
    addListener(formatValue = null){
        /** @type {Object} */
        const input = document.querySelector(`#${this.element_id}`)
        const listener = (e) => this.#exListener(e, formatValue)

        input.addEventListener('input', listener)
        input.addEventListener('keyup', listener)
        input.addEventListener('blur', listener)

        return false
    }
    /**
     * @param {string} name name of radios
     * 
     * @returns {false}
     */
    addRadioListener(name){
        /** @type {Object} */
        const radios = document.querySelectorAll(`input[name="${name}"]`)

        for (const radio of radios) {
            const listener = () => this.#exListener(radio, name)

            radio.addEventListener('change', listener)
        }

        return false
    }
    /** @returns {boolean} */
    hasErrors(){
        const check = this.errors.every(error => error === false);

        return check == true ? false : true    
    }
    /** @returns {string|false} */
    getFirstError(){
        if (this.errors.length > 0) {
            return this.errors[0].message
        }
        return false
    }
    /** @returns {Array<string>|false} */
    getErrorsMessages(callback = null) {
        if (this.errors.length > 0) {
            const messages = []

            for (const {message} of this.errors) {
                messages.push(message)
            }

            if(callback)
                return callback(messages)
            return messages
        }

        return false
    }
    /** @returns {Array.<{field_name: string, element_id: string|number|null, error: string, message: string}>|false} */
    getErrorsDetail(callback = null) {
        if (this.errors.length > 0){
            if(callback)
                return callback(this.errors)
            return this.errors
        }
        
        return false
    }
    /**
     * @param {Object} ulAttributes id, class, etc.
     * @param {Object} liAttributes id, class, etc
     * 
     * @returns {HTMLUListElement} List of errors with ul and li elements
     */
    getErrorsList(ulAttributes = null, liAttributes = null){
        const ul = document.createElement('ul')
        if (ulAttributes) {
            for (const [name, value] of Object.entries(ulAttributes)) {
                ul.setAttribute(name, value)
            }
        }
    
        for (const {message} of this.errors) {
            const li = document.createElement('li')
            if (liAttributes) {
                for (const [name, value] of Object.entries(liAttributes)) {
                    ul.setAttribute(name, value)
                }
            }
            li.innerHTML = message
            ul.appendChild(li)    
        }
    
        return ul
    }
    /**
     * This show the errors in the elements with class .validator-error
     */
    showErrorsMessages(){
        const elementsErrors = document.querySelectorAll('.validator-error')

        elementsErrors.forEach(el => {
            el.innerHTML = ''
        })

        this.inputs.forEach(el => {
            if (el) {
                let input
                input = document.querySelector(`#${el}`)
                if (!input) {
                    input = document.querySelectorAll(`input[name="${el}"]`)
                    for (const radio of input) {
                        this.#showRadioErrorMessage(radio)
                    }                   
                }else{
                    this.#showErrorMessage(input)                    
                }
            }            
        })
    }

    #setErrorMessage(element_id){
        const input = document.querySelector(`#${element_id}`)
        const p = document.createElement('p')
        p.classList.add('validator-error')

        let parentElement = input.parentElement
        // let nextSibling = nextElement.parentElement
        parentElement.appendChild(p)
        // input.insertAdjacentElement('afterend', p)
    }
    /**
     * Function to call all of the validations of the input
     * 
     * @param {Object} e 
     * @param {Function} formatValue 
     */
    #exListener(e, formatValue = null){
        const input = e.target
        const name = this.dataMessages[input.id]

        if (formatValue) {
            this.value = !['', null].includes(input.value) ? formatValue(input.value) : ''
        }else if(input.type == 'number'){
            this.value = !['', null].includes(input.value) ? parseInt(input.value) : ''
        }else if(input.type == 'checkbox'){
            this.value = input.checked
        }else{
            this.value = input.value
        }

        this.element_id = input.type != 'radio' ? input.id : input.name
        this.field_name = name

        this.errors = this.errors.filter(er => {
            return er.element_id != input.id
        })

        const validations = input.type != 'radio' ? this.validations[input.id] : this.validations[name]

        for (const [index, value] of Object.entries(validations)) {
            if (index != 'customErrorRegex') {
                this[index](...value)
            }else{
                for (const arg of value) {
                    // @ts-ignore
                    this[index](...arg)
                }
            }
        }

        if (input.type != 'radio') {
            this.#showErrorMessage(input)
        }else{
            this.#showRadioErrorMessage(input)
        }
    }
    /**
     * 
     * @param {Object} input 
     */
    #showRadioErrorMessage(input){
        const errorElement = this.#getErrorElement(input)
        const error = this.errors.find(er => er.element_id == input.name)

        input.classList.remove('validator-invalid')
        input.classList.remove('validator-valid')

        if (error) {
            input.classList.add('validator-invalid')                    
            errorElement.innerHTML = error.message
        }else{
            input.classList.add('validator-valid')
            errorElement.innerHTML = ''
        }
    }
    /**
     * Function to show de error message in the element with the validator-error class
     * 
     * @param {Object} input 
     */
    #showErrorMessage(input){
        const errorElement = this.#getErrorElement(input)
        const error = this.errors.find(er => er.element_id == input.id)
                
        input.classList.remove('validator-invalid')
        input.classList.remove('validator-valid')

        if (error) {
            input.classList.add('validator-invalid')                    
            errorElement.innerHTML = error.message
        }else{
            input.classList.add('validator-valid')
            errorElement.innerHTML = ''
        }
    }
    /**
     * 
     * @param {Object} input 
     * 
     * @returns {Object}
     */
    #getErrorElement(input){
        let element
        let parentElement = input.parentElement

        while (parentElement !== null) {
            if (parentElement.querySelector('.validator-error')) {
                element = parentElement.querySelector('.validator-error')
                break
            }

            parentElement = parentElement.parentElement
        }

        return element
    }
}