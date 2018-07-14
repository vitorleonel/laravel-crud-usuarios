<template>
  <div class="register">
    <form class="form">
			<label for="name">Nome completo</label>
      <input type="text" class="input" id="name" autofocus placeholder="seu nome completo">

			<label for="email">E-mail</label>
      <input type="text" class="input" id="email" placeholder="seu e-mail">

			<label for="password">Senha</label>
      <input type="password" class="input" id="password" placeholder="sua senha">

			<label for="repassword">Confirmar senha</label>
      <input type="password" class="input" id="repassword" placeholder="confirmar sua senha">

      <button class="button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
  }
</script>


<style lang="scss" scoped>
  @tailwind utilities;

  .register {
    @apply .w-screen .h-screen .bg-grey-light .flex .justify-center .items-center;

    .form {
      max-width: 400px;
      @apply .w-1/4 .bg-white .p-5 .rounded-lg .shadow;
    }
  }
</style>
