<template>
  <div class="login">
    <form class="form">
      <input type="text" class="input" placeholder="seu e-mail">
      <input type="password" class="input" placeholder="sua senha">

      <button class="button">Entrar</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  }
</script>


<style lang="scss" scoped>
  @tailwind utilities;

  .login {
    @apply .w-screen .h-screen .bg-grey-light .flex .justify-center .items-center;

    .form {
      max-width: 400px;
      @apply .w-1/4 .bg-white .p-5 .rounded-lg .shadow;
    }
  }
</style>


