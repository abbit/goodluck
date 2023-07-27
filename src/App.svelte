<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import HomePage from "./pages/Home.svelte";
  import GeneratePage from "./pages/Generate.svelte";
  import LuckPage from "./pages/Luck.svelte";
</script>

<Router>
  <div class="bg-gray-200 min-w-full min-h-screen py-16 flex justify-center">
    <div class="flex flex-col w-11/12">
      <Route path="/:state" component={LuckPage} />
      <Route path="/generate" component={GeneratePage} />
      <Route path="/" component={HomePage} />
    </div>
  </div>
</Router>
