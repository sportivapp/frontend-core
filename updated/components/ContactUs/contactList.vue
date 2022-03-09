<template>
  <v-card class="contact-card" flat>
    <v-row>
      <!-- email -->
      <v-col class="box mb-10 pa-0" cols="auto" md="11">
        <v-row justify="center" align="center">
          <v-col class="pl-5" cols="auto" md="2">
            <v-icon class="icon ml-1">
              mdi-email-outline
            </v-icon>
          </v-col>
          <v-col class="mt-3" cols="auto" md="5">
            <h4>Email</h4>
            <p style="color:#707070">
              support@sportiv.app
            </p>
          </v-col>
          <v-col cols="auto" md="5">
            <a href="mailto:support@sportiv.app">
              <v-btn
                class="button"
                text
              >
                {{ $t('contactUs.emailNow') }}
              </v-btn>
            </a>
          </v-col>
        </v-row>
      </v-col>
      <!-- whatsapp -->
      <v-col class="box mb-10 pa-0" cols="auto" md="11">
        <v-row justify="center" align="center">
          <v-col class="pl-5" cols="auto" md="2">
            <v-icon class="icon ml-1">
              mdi-whatsapp
            </v-icon>
          </v-col>
          <v-col class="mt-3" cols="auto" md="5">
            <h4>WhatsApp</h4>
            <p style="color:#707070">
              +62 819 1986 918
            </p>
          </v-col>
          <v-col cols="auto" md="5">
            <a href="https://wa.me/+628191986918" target="_blank">
              <v-btn
                class="button"
                text
              >
                {{ $t('contactUs.whatsAppNow') }}
              </v-btn>
            </a>
          </v-col>
        </v-row>
      </v-col>
      <!-- call center -->
      <v-col class="box mb-10 pa-0" cols="auto" md="11">
        <v-row justify="center" align="center">
          <v-col class="pl-5" cols="auto" md="2">
            <v-icon class="icon ml-1">
              mdi-headset
            </v-icon>
          </v-col>
          <v-col class="mt-3" cols="auto" md="5">
            <h4>{{ $t('contactUs.callCenter') }}</h4>
            <p style="color:#707070">
              (+62 21) 29414654
            </p>
          </v-col>
          <v-col cols="auto" md="5" />
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .contact-card{
    background-color: transparent
  }
  a{
    text-decoration: none;
  }
  .box{
    border-radius: 10px;
    background-color: $white-2;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 3px 0px rgba(0, 0, 0, 0.14), 0px 0px 5px 2px rgba(0, 0, 0, 0.12) !important
  }

  .icon{
    border-radius: 50%;
    text-align: center;
    min-height: 56px;
    min-width:56px;
    background-color: $white-neutral;
  }

  .button{
    float: right;
    margin-right: 15px;
    width: 160px;
    background-color: $green-2;
    border-radius: 10px;
    color:$white-2;
    font-size: 12px;
    font-weight: 600;
  }
</style>
