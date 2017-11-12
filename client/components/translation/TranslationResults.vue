<template>
  <div>
    <div class="translation" v-for="translation in currentTranslations">
      <div class="translation__source">
        <div class="translation__source__item">
          <div class="translation__source__text">{{translation.source.text}}</div>
          <div class="translation__source__ipa">[{{translation.source.ipa}}]</div>
          <div class="translation__source__pos">{{translation.source.pos}}</div>
          <div class="translation__source__genus">{{translation.source.genus}}</div>
        </div>
      </div>
      <div class="translation__targets">
        <div @click="selectTargetTranslation(translation.source, target)" class="translation__target" v-for="(target, i) in translation.translations">
          <div class="translation__target__item">
            <div class="position">{{i + 1}}</div>
            <div class="translation__target__synonyms">
              <div class="translation__target__synonym">
                <div class="translation__target__text">{{target.text}}</div>
                <div class="translation__target__genus">{{target.genus}}</div>
                <template v-if="target.synonyms">,</template>
              </div>
              <div class="translation__target__synonym" v-for="(synonym, j) in target.synonyms">
                <div class="translation__target__text">{{synonym.text}}</div>
                <div class="translation__target__genus">{{synonym.gen}}</div>
                <template v-if="j < target.synonyms.length - 1">,</template>
              </div>
            </div>
            <div v-if="target.gen" class="translation__target__pos">{{ target.pos}}</div>
            <div v-if="target.gen" class="translation__target__genus">{{ target.genus}}</div>
          </div>
          <div v-if="target.synonyms" class="translation__target__synonyms">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'TranslationResults',
    computed: {
      ...mapGetters(['currentTranslations'])
    },
    methods: {
      selectTargetTranslation (source, target) {
        this.$store.dispatch('createVocable', {
          'word': {
            'word': source.text,
            'type': 1,
            'features': {
              pos: source.pos,
              genus: source.genus
            }
          },
          'translation': target.text
        })
      }
    }
  }
</script>

<style lang="scss">
  .translation {
    @include standard-shadow;
    width: 300px;
    margin-top: $global-margin * 2;
    &__target {
      padding: $global-padding $global-padding;
      font-size: .8rem;
      cursor: pointer;
      &:hover {
        background-color: #F4F5FF;
      }
      &__synonyms {
        display: flex;
        flex-direction: row;
      }
      &__texts {
        display: flex;
        flex-direction: row;
      }
      &__text {
        margin-right: $global-margin /2;
      }
      &__synonym {
        display: flex;
        flex-direction: row;
        padding-right: $global-padding;
      }
      &__item {
        display: flex;
        flex-direction: row;
        .position {
          color: $gray1;
          margin-right: $global-padding/2;
        }
      }
    }
    &__source {
      position: relative;
      height: 32px;
      margin-bottom: $global-margin;
      &__item {
        padding: 2*$global-padding $global-padding;
        position: absolute;
        font-size: 1rem;
        line-height: 1rem;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
      }
      &__text {
        margin-right: $global-margin;
      }
      &__ipa {
        color: $gray1;
        font-size: .8rem;
      }
      &__pos {
        margin-left: $global-margin;
        font-size: 0.8rem;
      }
      &__genus {
        margin-left: $global-margin;
        font-size: 0.8rem;
      }
    }
  }
</style>