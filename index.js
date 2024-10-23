document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("doughnutChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["قيد الإنتظار", "مكتملة", "ملغاة", "قيد التنفيذ", "مرفوضة"],
      datasets: [
        {
          data: [30, 25, 15, 20, 10],
          backgroundColor: [
            "#FFA500", // Orange
            "#4CAF50", // Green
            "#F44336", // Red
            "#2196F3", // Blue
            "#9C27B0", // Purple
          ],
          borderColor: "white",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  });

  // Create custom legend
  const legendContainer = document.getElementById("chartLegend");
  const ul = document.createElement("ul");
  ul.style.listStyleType = "none";
  ul.style.padding = "0";
  ul.style.margin = "0";

  chart.data.labels.forEach((label, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "5px";
    li.style.fontSize = "12px";
    li.style.cursor = "pointer";

    const colorBox = document.createElement("span");
    colorBox.style.width = "10px";
    colorBox.style.height = "10px";
    colorBox.style.display = "inline-block";
    colorBox.style.marginLeft = "5px";
    colorBox.style.backgroundColor =
      chart.data.datasets[0].backgroundColor[index];

    li.appendChild(colorBox);

    const labelText = document.createElement("span");
    labelText.textContent = label;

    li.appendChild(labelText);

    li.addEventListener("click", () => {
      const datasetIndex = 0;
      const meta = chart.getDataForElement(li);
      const dataset = chart.data.datasets[datasetIndex];
      const value = meta.datasetIndex;
      const index = meta.index;
      const label = dataset.labels[index];
      const color = dataset.backgroundColor[index];

      // Add event listener to handle click on legend item
      li.addEventListener("click", () => {
        // Handle click on legend item
      });
    });

    ul.appendChild(li);
  });

  legendContainer.appendChild(ul);

  // Data for the requests table
  const requestsData = [
    {
      id: 1,
      candidateName: "أحمد محمد",
      specialization: "هندسة برمجيات",
      status: "قيد الانتظار",
      department: "تقنية المعلومات",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      delayCount: 0,
      // Additional data for expanded view
      email: "ahmed@example.com",
      phone: "+966 50 123 4567",
      notes: "مرشح واعد مع خبرة في تطوير الويب",
    },
    {
      id: 2,
      candidateName: "فاطمة علي",
      specialization: "إدارة أعمال",
      status: "مكتملة",
      department: "الموارد البشرية",
      startDate: "2023-07-15",
      endDate: "2024-07-14",
      delayCount: 2,
      // Additional data for expanded view
      email: "fatima@example.com",
      phone: "+966 55 987 6543",
      notes: "خبرة سابقة في إدارة الموارد البشرية",
    },
    {
      id: 3,
      candidateName: "محمد خالد",
      specialization: "هندسة كهربائية",
      status: "مرفوضة",
      department: "الهندسة",
      startDate: "2023-08-01",
      endDate: "2024-07-31",
      delayCount: 1,
      // Additional data for expanded view
      email: "mohammed@example.com",
      phone: "+966 54 567 8901",
      notes: "يحتاج إلى مزيد من الخبرة في مجال الطاقة المتجددة",
    },
  ];

  // Function to create a status badge
  function createStatusBadge(status) {
    const statusClasses = {
      "قيد الانتظار": "bg-yellow-200 text-yellow-800",
      مكتملة: "bg-green-200 text-green-800",
      مرفوضة: "bg-red-200 text-red-800",
    };
    return `<span class="px-2 py-1 text-xs font-semibold rounded-full ${
      statusClasses[status] || ""
    }">${status}</span>`;
  }

  // Function to populate the table
  function populateRequestsTable() {
    const tableBody = document.getElementById("requestsTableBody");
    tableBody.innerHTML = requestsData
      .map(
        (request, index) => `
      <div class="request-row" data-index="${index}">
        <div class="grid grid-cols-9 gap-4 p-4 border-b text-sm cursor-pointer hover:bg-gray-50">
          <div>${request.id}</div>
          <div>${request.candidateName}</div>
          <div>${request.specialization}</div>
          <div>${createStatusBadge(request.status)}</div>
          <div>${request.department}</div>
          <div>${request.startDate}</div>
          <div>${request.endDate}</div>
          <div>${request.delayCount}</div>
          <div>
            <button class="text-blue-500 hover:text-blue-700 view-details" data-index="${index}">
              <i class="ph ph-eye"></i>
            </button>
            <button class="text-green-500 hover:text-green-700 mx-2 edit-details" data-index="${index}">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="text-red-500 hover:text-red-700">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </div>
        <div class="expanded-content hidden bg-gray-100 p-4 text-sm">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p><strong>البريد الإلكتروني:</strong> ${request.email}</p>
              <p><strong>رقم الهاتف:</strong> ${request.phone}</p>
            </div>
            <div>
              <p><strong>ملاحظات:</strong> ${request.notes}</p>
            </div>
          </div>
          <div class="mt-4">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
              طباعة التقرير
            </button>
            <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              تحديث الحالة
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Add click event listeners to rows
    const rows = document.querySelectorAll(".request-row");
    rows.forEach((row) => {
      row.addEventListener("click", function (event) {
        // Prevent the click event from propagating to parent elements
        event.stopPropagation();

        const expandedContent = this.querySelector(".expanded-content");
        const isCurrentlyExpanded =
          !expandedContent.classList.contains("hidden");

        // Close all expanded rows
        document.querySelectorAll(".expanded-content").forEach((content) => {
          content.classList.add("hidden");
        });

        // If the clicked row wasn't expanded, open it
        if (!isCurrentlyExpanded) {
          expandedContent.classList.remove("hidden");
        }
      });
    });

    // Add click event listeners to view details buttons
    const viewButtons = document.querySelectorAll(".view-details");
    viewButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        const index = this.getAttribute("data-index");
        const request = requestsData[index];
        showDetailsPopup(request);
      });
    });

    // Add click event listeners to edit buttons
    const editButtons = document.querySelectorAll(".edit-details");
    editButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        const index = this.getAttribute("data-index");
        const request = requestsData[index];
        showEditPopup(request, index);
      });
    });
  }

  function showDetailsPopup(request) {
    const popup = document.createElement("div");
    popup.className =
      "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center";
    popup.innerHTML = `
      <div class="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">تفاصيل الطلب</h2>
        <hr class="my-4 border-t border-gray-300">
        <div class="mb-4">
          <p><strong>الاسم:</strong> ${request.candidateName}</p>
          <p><strong>التخصص:</strong> ${request.specialization}</p>
          <p><strong>الحالة:</strong> ${request.status}</p>
          <p><strong>القسم:</strong> ${request.department}</p>
          <p><strong>تاريخ البدء:</strong> ${request.startDate}</p>
          <p><strong>تاريخ الانتهاء:</strong> ${request.endDate}</p>
          <p><strong>عدد التأخيرات:</strong> ${request.delayCount}</p>
          <p><strong>البريد الإلكتروني:</strong> ${request.email}</p>
          <p><strong>رقم الهاتف:</strong> ${request.phone}</p>
          <p><strong>ملاحظات:</strong> ${request.notes}</p>
        </div>
        <hr class="my-4 border-t border-gray-300">
        <div class="text-right">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="closePopup">
            إغلاق
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
      document.body.removeChild(popup);
    });
  }

  function showEditPopup(request, index) {
    const popup = document.createElement("div");
    popup.className =
      "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center";
    popup.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div class="bg-gray-100 px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 class="text-xl font-bold">تعديل الطلب</h2>
          <button class="text-gray-600 hover:text-gray-800" id="closePopup">
            <i class="ph ph-x-circle text-2xl"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-bold mb-1" for="candidateName">الاسم:</label>
              <input class="w-full px-3 py-2 border rounded" type="text" id="candidateName" value="${request.candidateName}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="specialization">التخصص:</label>
              <input class="w-full px-3 py-2 border rounded" type="text" id="specialization" value="${request.specialization}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="status">الحالة:</label>
              <input class="w-full px-3 py-2 border rounded" type="text" id="status" value="${request.status}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="department">القسم:</label>
              <input class="w-full px-3 py-2 border rounded" type="text" id="department" value="${request.department}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="startDate">تاريخ البدء:</label>
              <input class="w-full px-3 py-2 border rounded" type="date" id="startDate" value="${request.startDate}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="endDate">تاريخ الانتهاء:</label>
              <input class="w-full px-3 py-2 border rounded" type="date" id="endDate" value="${request.endDate}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="delayCount">عدد التأخيرات:</label>
              <input class="w-full px-3 py-2 border rounded" type="number" id="delayCount" value="${request.delayCount}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="email">البريد الإلكتروني:</label>
              <input class="w-full px-3 py-2 border rounded" type="email" id="email" value="${request.email}">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1" for="phone">رقم الهاتف:</label>
              <input class="w-full px-3 py-2 border rounded" type="tel" id="phone" value="${request.phone}">
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold mb-1" for="notes">ملاحظات:</label>
            <textarea class="w-full px-3 py-2 border rounded" id="notes" rows="3">${request.notes}</textarea>
          </div>
        </div>
        <div class="bg-gray-100 px-6 py-4 rounded-b-lg text-right">
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" id="saveChanges">
            حفظ التغييرات
          </button>
          <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" id="cancelEdit">
            إلغاء
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
      document.body.removeChild(popup);
    });

    document.getElementById("cancelEdit").addEventListener("click", () => {
      document.body.removeChild(popup);
    });

    document.getElementById("saveChanges").addEventListener("click", () => {
      // Update the request data
      requestsData[index] = {
        ...request,
        candidateName: document.getElementById("candidateName").value,
        specialization: document.getElementById("specialization").value,
        status: document.getElementById("status").value,
        department: document.getElementById("department").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        delayCount: parseInt(document.getElementById("delayCount").value),
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        notes: document.getElementById("notes").value,
      };

      // Refresh the table
      populateRequestsTable();

      // Close the popup
      document.body.removeChild(popup);
    });
  }

  // Call the function to populate the table
  populateRequestsTable();

  const notificationButton = document.getElementById("notificationButton");
  const notificationDropdown = document.getElementById("notificationDropdown");
  const notificationCount = document.getElementById("notificationCount");

  if (notificationButton && notificationDropdown && notificationCount) {
    notificationButton.addEventListener("click", function (event) {
      event.stopPropagation();
      notificationDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", function (event) {
      if (
        !notificationDropdown.contains(event.target) &&
        event.target !== notificationButton
      ) {
        notificationDropdown.classList.add("hidden");
      }
    });

    // Mark notifications as read when clicked
    const notifications = notificationDropdown.querySelectorAll(
      'div[class*="border-b"]'
    );
    notifications.forEach((notification) => {
      notification.addEventListener("click", function () {
        this.style.opacity = "0.5";
        updateNotificationCount();
      });
    });

    function updateNotificationCount() {
      const unreadNotifications = notificationDropdown.querySelectorAll(
        'div[class*="border-b"]:not([style*="opacity"])'
      ).length;
      notificationCount.textContent = unreadNotifications;
      if (unreadNotifications === 0) {
        notificationCount.classList.add("hidden");
      } else {
        notificationCount.classList.remove("hidden");
      }
    }
  } else {
    console.error("One or more required elements not found");
  }
});
