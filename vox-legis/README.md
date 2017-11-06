# vox-legis

## Instalação de dependências

```
yarn
```

## Execução em desenvolvimento

```
yarn start
```

## Build local

```
yarn dist
```

## Processo de release

```
1. Draft a new release. Set the "Tag version" to the value of version in your application package.json, and prefix it with v. "Release title" can be anything you want.
    * For example, if your application package.json version is 1.0, your draft's "Tag version" would be v1.0.
2. Push some commits. Every CI build will update the artifacts attached to this draft.
3. Once you are done, publish the release. GitHub will tag the latest commit for you.
```

ref.: https://github.com/electron-userland/electron-builder/wiki/Publishing-Artifacts#cli-flags