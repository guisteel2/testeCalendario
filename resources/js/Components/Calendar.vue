<script setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const tasks = ref([]);

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: [],
  editable: true,
  eventDrop: async (info) => {
    let taskId = info.event.id;
    let newDate = info.event.startStr;
    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ due_date: newDate }),
    });
  },
  eventClick: (info) => {
    let newStatus = prompt("Digite o novo status: Pendente ou Concluída", info.event.extendedProps.status);
    if (newStatus) {
      updateTask(info.event.id, { status: newStatus });
    }
  },
});

async function loadTasks() {
  const res = await fetch("/api/tasks");
  tasks.value = await res.json();

  calendarOptions.value.events = tasks.value.map((t) => ({
    id: t.id,
    title: t.title,
    start: t.due_date,
    color: t.status === "Pendente" ? "red" : "green",
    extendedProps: { status: t.status },
  }));
}

async function updateTask(id, data) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  loadTasks();
}

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
