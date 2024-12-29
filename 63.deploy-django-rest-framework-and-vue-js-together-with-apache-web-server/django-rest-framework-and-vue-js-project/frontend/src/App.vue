<template>
  <div class="App">
    <h1>Connect Vue JS to Django</h1>
    <div v-for="(student, index) in students" :key="index">
      <h2>{{ student.stuname }} {{ student.email }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Student {
  id: number;
  stuname: string;
  email: string;
}

export default {
  name: "App",
  setup() {
    const students = ref<Student[]>([]);

    const getAllStudents = async () => {
      try {
        const response = await axios.get<Student[]>("http://backend.django-rest-framework-and-vue-js-project.com/api/student/");
        students.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getAllStudents();
    });

    return {
      students,
    };
  },
};
</script>

<style>
.App {
  text-align: center;
}
</style>

