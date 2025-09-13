

        // تخزين الديون في الذاكرة (في تطبيق حقيقي سيكون في قاعدة بيانات)
        let debts = JSON.parse(localStorage.getItem('debts')) || [];
        let settings = JSON.parse(localStorage.getItem('settings')) || {
            currency: 'SAR',
            notifications: true,
            reminderDays: 3
        };

        // عناصر DOM
        const debtForm = document.getElementById('debtForm');
        const debtsList = document.getElementById('debtsList');
        const searchInput = document.getElementById('search');
        const filterStatus = document.getElementById('filterStatus');
        const emptyState = document.getElementById('emptyState');
        const editModal = document.getElementById('editModal');
        const deleteModal = document.getElementById('deleteModal');
        const reminderModal = document.getElementById('reminderModal');
        const notification = document.getElementById('notification');
        const clearFormBtn = document.getElementById('clearForm');
        const exportDataBtn = document.getElementById('exportData');
        const clearAllBtn = document.getElementById('clearAll');

        // عناصر الإحصائيات
        const totalDebts = document.getElementById('totalDebts');
        const pendingDebts = document.getElementById('pendingDebts');
        const paidDebts = document.getElementById('paidDebts');
        const overdueDebts = document.getElementById('overdueDebts');
        const totalPendingAmount = document.getElementById('totalPendingAmount');
        const totalPaidAmount = document.getElementById('totalPaidAmount');
        const avgDuration = document.getElementById('avgDuration');
        const creditorsCount = document.getElementById('creditorsCount');

        // تبديل علامات التبويب
        document.querySelectorAll('.tab, .sidebar-menu a').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const tabName = this.getAttribute('data-tab');
                
                // إزالة الفئة النشطة من جميع علامات التبويب
                document.querySelectorAll('.tab, .sidebar-menu a').forEach(t => {
                    t.classList.remove('active');
                });
                
                // إضافة الفئة النشطة للعلامة المحددة
                this.classList.add('active');
                
                // إخفاء جميع محتويات العلامات
                document.querySelectorAll('.tabs-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // عرض محتوى العلامة المحددة
                document.getElementById(tabName).classList.add('active');
            });
        });

        // إغلاق النماذج عند النقر على X
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                editModal.style.display = 'none';
                deleteModal.style.display = 'none';
                reminderModal.style.display = 'none';
            });
        });

        // إغلاق النماذج عند النقر خارجها
        window.addEventListener('click', (e) => {
            if (e.target === editModal) editModal.style.display = 'none';
            if (e.target === deleteModal) deleteModal.style.display = 'none';
            if (e.target === reminderModal) reminderModal.style.display = 'none';
        });

        // إضافة دين جديد
        debtForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const currency = document.getElementById('currency').value;
            const date = document.getElementById('date').value;
            const status = document.getElementById('status').value;
            const category = document.getElementById('category').value;
            const notes = document.getElementById('notes').value;
            const contact = document.getElementById('contact').value;

            const newDebt = {
                id: Date.now(),
                name,
                amount,
                currency,
                date,
                status,
                category,
                notes,
                contact,
                createdAt: new Date().toISOString()
            };

            debts.push(newDebt);
            saveDebts();
            renderDebts();
            showNotification('تم إضافة الدين بنجاح!');
            debtForm.reset();
            document.getElementById('currency').value = settings.currency;
        });

        // مسح النموذج
        clearFormBtn.addEventListener('click', () => {
            debtForm.reset();
            document.getElementById('currency').value = settings.currency;
        });

        // عرض الديون
        function renderDebts(filteredDebts = debts) {
            debtsList.innerHTML = '';
            
            if (filteredDebts.length === 0) {
                emptyState.style.display = 'block';
                debtsList.parentElement.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                debtsList.parentElement.style.display = 'block';
                
                filteredDebts.forEach(debt => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${debt.name}</td>
                        <td>${debt.amount.toLocaleString()} ${debt.currency}</td>
                        <td>${formatDate(debt.date)}</td>
                        <td><span class="status status-${debt.status}">${getStatusText(debt.status)}</span></td>
                        <td>${getCategoryText(debt.category)}</td>
                        <td>${debt.contact || '-'}</td>
                        <td>
                            <div class="actions">
                                <button class="action-btn edit-btn" data-id="${debt.id}">تعديل</button>
                                <button class="action-btn delete-btn" data-id="${debt.id}">حذف</button>
                                ${debt.status === 'pending' || debt.status === 'overdue' ? 
                                    `<button class="action-btn reminder-btn" data-id="${debt.id}">تذكير</button>` : 
                                    ''}
                            </div>
                        </td>
                    `;
                    debtsList.appendChild(row);
                });

                // إضافة أحداث الأزرار
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => openEditModal(e.target.dataset.id));
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => openDeleteModal(e.target.dataset.id));
                });

                document.querySelectorAll('.reminder-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => openReminderModal(e.target.dataset.id));
                });
            }

            updateStats();
            updateDashboard();
        }

        // فتح نافذة التعديل
        function openEditModal(id) {
            const debt = debts.find(d => d.id == id);
            if (!debt) return;

            document.getElementById('editId').value = debt.id;
            document.getElementById('editName').value = debt.name;
            document.getElementById('editAmount').value = debt.amount;
            document.getElementById('editCurrency').value = debt.currency;
            document.getElementById('editDate').value = debt.date;
            document.getElementById('editStatus').value = debt.status;
            document.getElementById('editCategory').value = debt.category;
            document.getElementById('editNotes').value = debt.notes;
            document.getElementById('editContact').value = debt.contact;

            editModal.style.display = 'flex';
        }

        // تحديث الدين
        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('editId').value;
            const debt = debts.find(d => d.id == id);
            if (!debt) return;

            debt.name = document.getElementById('editName').value;
            debt.amount = parseFloat(document.getElementById('editAmount').value);
            debt.currency = document.getElementById('editCurrency').value;
            debt.date = document.getElementById('editDate').value;
            debt.status = document.getElementById('editStatus').value;
            debt.category = document.getElementById('editCategory').value;
            debt.notes = document.getElementById('editNotes').value;
            debt.contact = document.getElementById('editContact').value;

            saveDebts();
            renderDebts();
            showNotification('تم تحديث الدين بنجاح!');
            editModal.style.display = 'none';
        });

        // فتح نافذة الحذف
        function openDeleteModal(id) {
            document.getElementById('deleteId').value = id;
            deleteModal.style.display = 'flex';
        }

        // تأكيد الحذف
        document.getElementById('confirmDelete').addEventListener('click', function() {
            const id = document.getElementById('deleteId').value;
            debts = debts.filter(d => d.id != id);
            saveDebts();
            renderDebts();
            showNotification('تم حذف الدين بنجاح!');
            deleteModal.style.display = 'none';
        });

        // إلغاء الحذف
        document.getElementById('cancelDelete').addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });

        // فتح نافذة التذكير
        function openReminderModal(id) {
            const debt = debts.find(d => d.id == id);
            if (!debt) return;

            document.getElementById('reminderId').value = debt.id;
            document.getElementById('reminderName').textContent = debt.name;
            document.getElementById('reminderAmount').textContent = `${debt.amount.toLocaleString()} ${debt.currency}`;
            document.getElementById('reminderDate').textContent = formatDate(debt.date);
            
            // تحديث رسالة التذكير
            const message = document.getElementById('reminderMessage');
            message.value = message.value
                .replace('[الاسم]', debt.name)
                .replace('[المبلغ]', `${debt.amount.toLocaleString()} ${debt.currency}`)
                .replace('[التاريخ]', formatDate(debt.date));

            reminderModal.style.display = 'flex';
        }

        // إرسال التذكير
        document.getElementById('sendReminder').addEventListener('click', function() {
            const message = document.getElementById('reminderMessage').value;
            showNotification('تم إرسال التذكير بنجاح!');
            reminderModal.style.display = 'none';
        });

        // إلغاء التذكير
        document.getElementById('cancelReminder').addEventListener('click', function() {
            reminderModal.style.display = 'none';
        });

        // تحديث الإحصائيات
        function updateStats() {
            totalDebts.textContent = debts.length;
            pendingDebts.textContent = debts.filter(d => d.status === 'pending').length;
            paidDebts.textContent = debts.filter(d => d.status === 'paid').length;
            overdueDebts.textContent = debts.filter(d => d.status === 'overdue').length;
        }

        // تحديث لوحة التحكم
        function updateDashboard() {
            // إجمالي المبالغ المعلقة
            const pendingAmount = debts
                .filter(d => d.status === 'pending' || d.status === 'overdue')
                .reduce((sum, d) => sum + d.amount, 0);
            totalPendingAmount.textContent = `${pendingAmount.toLocaleString()} ر.س`;

            // إجمالي المبالغ المدفوعة
            const paidAmount = debts
                .filter(d => d.status === 'paid')
                .reduce((sum, d) => sum + d.amount, 0);
            totalPaidAmount.textContent = `${paidAmount.toLocaleString()} ر.س`;

            // متوسط مدة الاستحقاق
            const now = new Date();
            const durations = debts.map(debt => {
                const dueDate = new Date(debt.date);
                return Math.abs(Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24)));
            });
            const avg = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b) / durations.length) : 0;
            avgDuration.textContent = `${avg} يوم`;

            // عدد المدينين
            const creditors = [...new Set(debts.map(d => d.name))];
            creditorsCount.textContent = creditors.length;

            // تحديث الرسوم البيانية
            updateCharts();
            updateOverdueList();
        }

        // تحديث الرسوم البيانية
        function updateCharts() {
            // رسم بياني للديون حسب الحالة
            const statusData = {
                pending: debts.filter(d => d.status === 'pending').length,
                paid: debts.filter(d => d.status === 'paid').length,
                overdue: debts.filter(d => d.status === 'overdue').length
            };

            // رسم بياني حسب الفئة
            const categoryData = {
                personal: debts.filter(d => d.category === 'personal').length,
                business: debts.filter(d => d.category === 'business').length,
                family: debts.filter(d => d.category === 'family').length,
                other: debts.filter(d => d.category === 'other').length
            };
        }

        // تحديث قائمة الديون المتأخرة
        function updateOverdueList() {
            const overdueList = document.getElementById('overdueList');
            const noOverdue = document.getElementById('noOverdue');
            const overdueDebts = debts.filter(d => d.status === 'overdue');
            
            if (overdueDebts.length === 0) {
                noOverdue.style.display = 'block';
                overdueList.innerHTML = '<p id="noOverdue">لا توجد ديون متأخرة</p>';
            } else {
                noOverdue.style.display = 'none';
                overdueList.innerHTML = '<table><tr><th>المدين</th><th>المبلغ</th><th>تاريخ الاستحقاق</th><th>الإجراءات</th></tr>';
                overdueDebts.forEach(debt => {
                    overdueList.innerHTML += `
                        <tr>
                            <td>${debt.name}</td>
                            <td>${debt.amount.toLocaleString()} ${debt.currency}</td>
                            <td>${formatDate(debt.date)}</td>
                            <td><button class="btn btn-warning" onclick="openReminderModal(${debt.id})">إرسال تذكير</button></td>
                        </tr>
                    `;
                });
                overdueList.innerHTML += '</table>';
            }
        }

        // حفظ الديون في التخزين المحلي
        function saveDebts() {
            localStorage.setItem('debts', JSON.stringify(debts));
        }

        // تنسيق التاريخ
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('ar-SA', options);
        }

        // الحصول على نص الحالة
        function getStatusText(status) {
            switch(status) {
                case 'pending': return 'معلق';
                case 'paid': return 'مدفوع';
                case 'overdue': return 'متأخر';
                default: return 'معلق';
            }
        }

        // الحصول على نص الفئة
        function getCategoryText(category) {
            switch(category) {
                case 'personal': return 'شخصي';
                case 'business': return 'تجاري';
                case 'family': return 'عائلي';
                case 'other': return 'أخرى';
                default: return 'أخرى';
            }
        }

        // بحث عن الديون
        searchInput.addEventListener('input', filterDebts);
        filterStatus.addEventListener('change', filterDebts);

        function filterDebts() {
            const searchTerm = searchInput.value.toLowerCase();
            const statusFilter = filterStatus.value;
            
            let filtered = debts;
            
            if (searchTerm) {
                filtered = filtered.filter(debt => 
                    debt.name.toLowerCase().includes(searchTerm) ||
                    debt.amount.toString().includes(searchTerm) ||
                    debt.notes.toLowerCase().includes(searchTerm) ||
                    debt.contact.toLowerCase().includes(searchTerm)
                );
            }
            
            if (statusFilter !== 'all') {
                filtered = filtered.filter(debt => debt.status === statusFilter);
            }
            
            renderDebts(filtered);
        }

        // تصدير البيانات
        exportDataBtn.addEventListener('click', function() {
            const dataStr = JSON.stringify(debts, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'debts_data.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            showNotification('تم تصدير البيانات بنجاح!');
        });

        // مسح جميع البيانات
        clearAllBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد أنك تريد مسح جميع البيانات؟ هذه العملية لا يمكن التراجع عنها.')) {
                debts = [];
                saveDebts();
                renderDebts();
                showNotification('تم مسح جميع البيانات بنجاح!');
            }
        });

        // عرض الإشعار
        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // تحميل البيانات عند بدء التشغيل
        function initApp() {
            // تعيين العملة الافتراضية
            if (document.getElementById('currency')) {
                document.getElementById('currency').value = settings.currency;
            }
            
            // عرض البيانات
            renderDebts();
            
            // تحقق من الديون المتأخرة
            checkOverdueDebts();
        }

        // التحقق من الديون المتأخرة
        function checkOverdueDebts() {
            const now = new Date();
            let hasOverdue = false;
            
            debts.forEach(debt => {
                const dueDate = new Date(debt.date);
                if (debt.status === 'pending' && dueDate < now) {
                    debt.status = 'overdue';
                    hasOverdue = true;
                }
            });
            
            if (hasOverdue) {
                saveDebts();
                renderDebts();
                showNotification('تم تحديث حالة بعض الديون إلى متأخرة');
            }
        }

        // بدء التطبيق
        initApp();

        // التحقق من الديون المتأخرة عند كل تحميل
        checkOverdueDebts();
    