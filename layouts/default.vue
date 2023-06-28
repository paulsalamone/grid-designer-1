<template>
<div class="default-layout"> 

<!-- nav -->
<TopHeader class="nav"/>
<main class="main">
<!-- editor page, gallery, hero etc -->
      <slot/>
</main>

  <!-- footer -->
  <footer class="footer">
    <p>footer</p>
    </footer>
</div>
</template>

<style lang="scss">

$dark: #333;
    .default-layout {
        display: grid;
        grid-template-areas:
            "nav nav nav"
            "main main main"
            "footer footer footer";
        grid-template-rows: 60px 1fr 50px;
        height: 100vh;
        width: 100vw; 
    }

    .nav, .main, .footer {
        padding: 1rem;
    }

    .nav {
        grid-area: nav;
        background-color: $dark;
padding: 0px 20px;
    }
    .main {
        grid-area: main;
    }
    .footer {
        grid-area: footer;
        background-color: $dark;
    }
</style>
